import { ModelCtor, Model, ModelAttributes } from "sequelize/types";
import { EzBackend } from "../definitions";
import { getModelSchema } from ".";
import { RouteOptions } from "fastify";
import * as response from "./generic-response";
import * as _ from "lodash"; //TODO: Tree shaking

type Iapi = () => RouteOptions;

interface Iapis {
  [index: string]: Iapi;
}

//TODO: Encapsulation
export class EzRouter {
  apis: Iapis;
  routePrefix: string;
  ezb: EzBackend;

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
      this.registerRoute(api());
    });
    // ezmodel.model.
  }
}

export class EzModel extends EzRouter {
  model: ModelCtor<Model<any, any>>;
  relations: Array<ModelCtor<Model<any, any>>>;

  constructor(modelName: string, attributes: ModelAttributes<Model<any, any>>) {
    super(modelName);
    this.relations = [];
    this.model = this.ezb.sequelize.define(modelName, attributes);
    this.initAPI();
  }

  private initAPI() {
    let ezModel = this;
    //TODO: Consider if this can be simplified into a non function
    //CREATE
    this.apis.createOne = () => {
      const routeDetails: RouteOptions = {
        method: "POST",
        url: "/",
        schema: {
          body: ezModel.getJsonSchema(false),
          response: {
            // 200: ezModel.getJsonSchema(true),
            400: response.badRequest,
          },
        },
        //TODO: Check nested
        async handler(req, res) {
          const newObj = await ezModel.model.create(
            req.body,
            ezModel.getRelationsOptions()
          );
          res.send(newObj);
        },
      };
      return routeDetails;
    };
    //READ
    this.apis.getOne = () => {
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
          //TODO: Check multi depth nested
          //TODO: Make params.id part of params
          const savedObj = await ezModel.model.findByPk(
            //@ts-ignore
            req.params.id,
            ezModel.getRelationsOptions()
          );
          if (savedObj === null) {
            res.code(404).send(response.notFoundMsg);
            return;
          }
          res.send(savedObj);
        },
      };
      return routeDetails;
    };
    //UPDATE
    this.apis.updateOne = () => {
      const routeDetails: RouteOptions = {
        method: "PUT",
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
            req.params.id,
            EzModel.getRelationsOptions(ezModel)
          );
          if (savedObj === null) {
            res.code(404).send(response.notFoundMsg);
            return;
          }
          EzModel.updateNested(ezModel, req.body);
          const updatedObj = _.extend(savedObj, req.body);
          await updatedObj.save();
          res.send(updatedObj);
        },
      };
      return routeDetails;
    };
    //DELETE
    this.apis.deleteOne = () => {
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
    };
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

  public hasOne(ezModel: EzModel) {
    this.model.hasOne(ezModel.model);
    this.relations.push(ezModel.model);
    //TODO: Figure out if its possible to switch all to schema
    //LEFT OFF: Need to make available to all scopes with fasitfy plugin
    this.ezb.server.addSchema(
      {
        $id: `#/definitions/${ezModel.routePrefix}`,
        ...ezModel.getJsonSchema(false),
      }
      //   ...ezModel.getJsonSchema(false),
    );
  }

  public getRelationsOptions() {
    return EzModel.getRelationsOptions(this);
  }

  public static getRelationsOptions(ezModel: EzModel) {
    return {
      include: ezModel.relations.map((relation) => {
        return { model: relation };
      }),
    };
  }

  //TODO: Make this recursive depth
  public static updateNested(ezModel: EzModel, updateBody: any) {
    const schema = ezModel.getJsonSchema(false);
    Object.entries(schema.properties).forEach(([key, value]) => {
      if (value.hasOwnProperty("$ref")) {
        const updatedObj = _.extend(ezModel.model[key], updateBody[key]);
        updatedObj.save();
      }
    });
  }
}

export { getModelSchema } from "./sequelize-json-schema";
export * as response from "./generic-response";
