import { EzModel, EzRouter } from "ezbackend";
import { DataTypes } from "sequelize";
import { ModelCtor, Model } from "sequelize";
import { RouteOptions } from "fastify";
import fastify from "fastify";
import _ from "lodash";

const sample = new EzModel("sample", {
  string: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  int: {
    type: DataTypes.INTEGER,
  },
  float: {
    type: DataTypes.FLOAT,
  },
  double: {
    type: DataTypes.DOUBLE
  },
  real: {
    type: DataTypes.REAL
  },
  enum: {
    type: DataTypes.ENUM,
    values: ['one','two','three']
  },
  data: {
    type: DataTypes.DATE
  },
  array: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  uuid: {
    type: DataTypes.UUID
  },
  json: {
    type: DataTypes.JSON
  }
});



class EzModelExtended extends EzModel {
  private associations: Array<ModelCtor<Model<any, any>>> = [];

  private getAssociationOptions() {
    return {
      include: this.associations.map((assoc) => {
        return { model: assoc };
      }),
    };
  }

  public hasOne(ezmodel: EzModelExtended) {
    if (ezmodel.model) {
      this.model?.hasOne(ezmodel.model);
      EzBackend.app().server?.addSchema({
        $id: `#/definitions/${ezmodel.modelName}`,
        ...ezmodel.getJsonSchema(false),
      });
      this.associations.push(ezmodel.model);
    }

    let that = this;

    this.apiFactories.createOne = (ezModel: EzModel) => {
      const routeDetails: RouteOptions = {
        method: "POST",
        url: "/",
        schema: {
          body: ezModel.getJsonSchema(false),
          response: response.badRequest,
        },
        async handler(req, res) {
          if (ezModel.model === undefined) {
            //TODO: Custom error?
            throw "Model has not been set yet";
          }
          //TODO: Allow for eager and lazy creation
          const newObj = await ezModel.model.create(
            req.body,
            that.getAssociationOptions()
          );
          res.send(newObj);
        },
      };
      return routeDetails;
    };

    this.apiFactories.getOne = (ezModel: EzModel) => {
      const routeDetails: RouteOptions = {
        method: "GET",
        url: "/:id",
        schema: {
          params: response.singleID,
          response: {
            200: ezModel.getJsonSchema(true),
            400: response.badRequest,
          },
        },
        async handler(req, res) {
          if (ezModel.model === undefined) {
            //TODO: Custom error?
            throw "Model has not been set yet";
          }
          //TODO: Allow for eager and lazy fetching
          const savedObj = await ezModel.model.findByPk(
            //@ts-ignore
            req.params.id,
            that.getAssociationOptions()
          );
          if (savedObj === null) {
            res.code(404).send("Not found");
            return;
          }

          res.send(savedObj);
        },
      };
      return routeDetails;
    };

    //TODO: Make this recursive depth
    function updateNested(model: Model, schema: any, body: any) {
      Object.entries(schema.properties).forEach(([key, value]) => {
        //@ts-ignore
        if (value.hasOwnProperty('$ref')) {
          //It is a schema
          //@ts-ignore
          const updatedObj = _.extend(model[key], body[key]);
          //@ts-ignore
          updatedObj.save()
          //@ts-ignore
          console.log('model needs saving', model[key])
        }
      });
    }

    //TODO: Can we make the above and below merge so that we are DRY?
    this.apiFactories.updateOne = (ezModel: EzModel) => {
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
          if (ezModel.model === undefined) {
            //TODO: Custom error?
            throw "Model has not been set yet";
          }
          //TODO: Allow for eager and lazy fetching
          const savedObj = await ezModel.model.findByPk(
            //@ts-ignore
            req.params.id,
            that.getAssociationOptions()
          );
          if (savedObj === null) {
            res.code(404).send(response.notFoundMsg);
            return;
          }
          updateNested(savedObj,ezModel.getJsonSchema(true),req.body)
          const updatedObj = _.extend(savedObj, req.body);
          await updatedObj.save();
          res.send(updatedObj);
        },
      };
      return routeDetails;
    };
  }
}

const user = new EzModelExtended("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const program = new EzModelExtended("program", {});

program.hasOne(user);

user.registerRoutes();
program.registerRoutes();

// export const customEndpoint = new EzRouter("custom")

// customEndpoint.registerRoute({
//   method: 'GET',
//   url: '/',
//   schema: {
//     body: {

//     },
//     response: {
//       200: {}
//     }
//   },
//   handler(req,res) {
//     res.send('hi')
//   }
// })

  
// export const customEndpoint = new EzRouter("custom")

// customEndpoint.registerRoute({
//   method: 'GET',
//   url: '/',
//   schema: {
//     body: {

//     },
//     response: {
//       200: {}
//     }
//   },
//   handler(req,res) {
//     res.send('hi')
//   }
// })