import {
  ModelCtor,
  Model,
  ModelAttributes,
  HasOneOptions,
  BelongsToOptions,
  HasManyOptions,
} from "sequelize/types";
import { EzBackend } from "../definitions";
import { getModelSchema } from ".";
import { RouteOptions } from "fastify";
import * as response from "./generic-response";
import * as _ from "lodash"; //TODO: Tree shaking

type Iapi<model> = (self: model) => RouteOptions;

interface Iapis<model> {
  [index: string]: Iapi<model>;
}

//TODO: Encapsulation
export class EzRouter {
  apis: Iapis<EzRouter>;
  routePrefix: string;
  private ezb: EzBackend;

  constructor(routePrefix?: string) {
    this.ezb = EzBackend.app() as EzBackend;
    this.apis = {};
    this.routePrefix = routePrefix ?? "";
  }

  public registerRoute(newRoute: RouteOptions) {
    this.ezb.server.register(
      (server: any, opts: any, done: any) => {
        server.route(newRoute);
        done();
      },
      {
        prefix: this.routePrefix,
      }
    );
  }

  public registerRoutes() {
    Object.entries(this.apis).forEach(([, api]) => {
      this.registerRoute(api(this));
    });
  }
}

export class EzModel extends EzRouter {
  apis: Iapis<EzModel>;
  model: ModelCtor<Model<any, any>>;

  private static apiGenerators: Iapis<EzModel> = {};

  constructor(
    modelName: string,
    attributes: ModelAttributes<Model<any, any>>,
    opts?: any
  ) {
    const ezb = EzBackend.app() as EzBackend;
    super(modelName);
    this.model = ezb.sequelize.define(modelName, attributes);
    this.apis = EzModel.apiGenerators;
  }

  public static getAPIgenerators() {
    return EzModel.apiGenerators;
  }

  public static setAPIgenerator(name: string, newAPIgenerator: Iapi<EzModel>) {
    EzModel.apiGenerators[name] = newAPIgenerator;
  }

  //TODO: reqBody type?
  //URGENT TODO: Check nested and throw error if wrong format

  public static associationOptions(
    model: ModelCtor<Model<any, any>>,
    reqBody?: any
  ) {
    if (Array.isArray(reqBody)) {
      reqBody = reqBody[0];
    }
    const assocOptions = Object.entries(model.associations).flatMap(
      ([key, assoc]) => {
        if (reqBody === undefined || Object.keys(reqBody).includes(key)) {
          if (Object.keys(assoc.target.associations).length !== 0) {
            //There are deeper associations
            const nestedModel = assoc.target;
            const nestedReqBody = reqBody ? reqBody[key] : undefined;
            return [
              {
                association: assoc,
                ...EzModel.associationOptions(nestedModel, nestedReqBody),
              },
            ];
          } else {
            //There are no deeper associations
            return [assoc.target];
          }
        }
        return [];
      }
    );
    return { include: assocOptions };
  }

  public getJsonSchema(full: boolean) {
    if (full) {
      const schema = getModelSchema(this.model);
      return schema;
    } else {
      return getModelSchema(this.model, {
        exclude: ["id", "createdAt", "updatedAt"],
      });
    }
  }

  public static addSchema(ezModel: EzModel) {
    //TODO: Figure out if its possible to switch all to schema
    const ezb = EzBackend.app() as EzBackend;
    ezb.server.addSchema({
      $id: `#/definitions/${ezModel.routePrefix}`,
      ...ezModel.getJsonSchema(false),
    });
  }

  public belongsTo(ezModel: EzModel, opts?: BelongsToOptions) {
    this.model.belongsTo(ezModel.model, opts);
  }

  public hasMany(ezModel: EzModel, opts?: HasManyOptions) {
    this.model.hasMany(ezModel.model, opts);
  }

  public hasOne(ezModel: EzModel, opts?: HasOneOptions) {
    this.model.hasOne(ezModel.model, opts);
  }

  //TODO: Add belongs to many option
}

//CREATE

//URGENT TODO: Make it such that more that different input format in nested will throw error instead of going unnoticed
EzModel.setAPIgenerator("createOne", (ezModel) => {
  const routeDetails: RouteOptions = {
    method: "POST",
    url: "/",
    schema: {
      body: ezModel.getJsonSchema(false),
      response: {
        200: ezModel.getJsonSchema(true),
        400: response.badRequest,
      },
    },
    async handler(req, res) {
      const newObj = await ezModel.model.create(
        req.body,
        EzModel.associationOptions(ezModel.model, req.body)
      );

      //TODO: Error handling when object was not successfully saved
      const savedObj = newObj && newObj.toJSON()

      res.send(savedObj);
    },
  };
  return routeDetails;
});

//READ
EzModel.setAPIgenerator("getOne", (ezModel) => {
  const routeDetails: RouteOptions = {
    method: "GET",
    url: "/:id",
    schema: {
      params: response.singleID,
      response: {
        200: ezModel.getJsonSchema(true),
        404: response.notFound,
      },
    },
    //TODO: Figure out a way to represent types
    async handler(req, res) {
      //TODO: Allow for eager and lazy fetching
      //TODO: Make params.id part of params

      const savedObj = await ezModel.model.findByPk(
        //@ts-ignore
        req.params.id,
        EzModel.associationOptions(ezModel.model)
      );

      if (savedObj === null) {
        res.code(404).send(response.notFoundMsg);
        return;
      }
      res.send(savedObj.toJSON());
    },
  };
  return routeDetails;
});

//UPDATE
EzModel.setAPIgenerator("updateOne", (ezModel) => {
  const routeDetails: RouteOptions = {
    method: "PATCH",
    url: "/:id",
    schema: {
      params: response.singleID,
      body: ezModel.getJsonSchema(false),
      response: {
        200: ezModel.getJsonSchema(true),
        404: response.notFound,
      },
    },

    //TODO: Figure out a way to represent types
    async handler(req, res) {
      //TODO: Allow for eager and lazy fetching
      const savedObj = await ezModel.model.findByPk(
        //@ts-ignore
        req.params.id
      );
      if (savedObj === null) {
        res.code(404).send(response.notFoundMsg);
        return;
      }

      const updatedObj = _.extend(savedObj, req.body);
      await updatedObj.save();
      res.send(updatedObj);
    },
  };
  return routeDetails;
});

//DELETE
EzModel.setAPIgenerator("deleteOne", (ezModel) => {
  const routeDetails: RouteOptions = {
    method: "DELETE",
    url: "/:id",
    schema: {
      params: response.singleID,
      response: {
        200: ezModel.getJsonSchema(true),
        404: response.notFound,
      },
    },
    //TODO: Figure out a way to represent types
    //TODO: Figure out nested delete
    async handler(req, res) {
      //@ts-ignore
      const savedObj = await ezModel.model.findByPk(req.params.id);
      if (savedObj === null) {
        res.code(404).send(response.notFoundMsg);
        return;
      }
      await savedObj.destroy();
      res.send(savedObj);
    },
  };
  return routeDetails;
});

export { getModelSchema } from "./sequelize-json-schema";
export * as response from "./generic-response";
