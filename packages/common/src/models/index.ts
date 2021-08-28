import { EzBackend } from "../definitions";
import { FastifyRequest, RouteOptions } from "fastify";
import * as _ from "lodash"; //TODO: Tree shaking
import { Entity, PrimaryColumn, Repository } from "typeorm";
import { getSchemaName } from "./typeorm-json-schema";
import Boom from '@hapi/boom'
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

//TODO: Give options for prefix
export function EzModel(): ClassDecorator {
  return function (target) {
    Entity()(target);
    const ezb = EzBackend.app();
    if (ezb.models === undefined) {
      ezb.models = [];
    }
    ezb.models.push(target);
  };
}

interface IAPIGeneratorOpts {
  prefix?: string;
}

type IGenerator = (repo: Repository<unknown>) => RouteOptions;

interface IGenerators {
  [index: string]: IGenerator;
}

//CREATE
export class APIGenerator {
  repo: Repository<unknown>;
  opts: IAPIGeneratorOpts;

  private static generators: IGenerators = {};

  public static setGenerator(generatorName: string, generator: IGenerator) {
    APIGenerator.generators[generatorName] = generator;
  }

  public static getGenerators() {
    return APIGenerator.generators;
  }

  constructor(repo: Repository<unknown>, opts?: IAPIGeneratorOpts) {
    this.repo = repo;
    this.opts = opts;
  }

  public generateRoutes() {
    const generators = APIGenerator.getGenerators();
    const ezb = EzBackend.app();
    let that = this;

    Object.entries(generators).forEach(([, generator]) => {
      ezb.server.register(
        (server, opts, cb) => {
          server.route(generator(this.repo));
          cb();
        },
        {
          prefix: that.opts.prefix,
        }
      );
    });
  }
}

export function getPrimaryColName(repo:Repository<unknown>) {
  const primaryColumns = repo.metadata.primaryColumns
  if (primaryColumns.length > 1) {
    throw "EzBackend currently only supports one Primary Column per entity. Raise an issue on github with your use case if you need more than one primary column in your entity"
  } 
  return primaryColumns[0].propertyName
}

//TODO: Remove trailing slash from path names
APIGenerator.setGenerator("createOne", (repo) => {
  const routeDetails: RouteOptions = {
    method: "POST",
    url: "/",
    schema: {
      body: { $ref: `${getSchemaName(repo.metadata,'createSchema')}#` },
      response: {
        200: { $ref: `${getSchemaName(repo.metadata,'fullSchema')}#` },
        400: {$ref: `ErrorResponse#`}
      },
    },
    handler: async (req, res) => {
      try {
        const newObj = await repo.save(req.body);
        res.send(newObj);
      } catch (e) {
        //Assumption: If it fails, it is because of a bad request, not the code breaking
        throw Boom.badRequest(e)
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("getOne", (repo) => {
  const primaryCol = getPrimaryColName(repo)
  const routeDetails: RouteOptions = {
    method: "GET",
    url: `/:${primaryCol}`,
    schema: {
      params: {
        type: "object",
        properties: {
          [primaryCol]: { type: "number" },
        },
      },
      response: {
        200: { $ref: `${getSchemaName(repo.metadata,'fullSchema')}#` },
        404: {$ref: `ErrorResponse#`}
      },
    },
    handler: async (req, res) => {
      try {
        const newObj = await repo.findOneOrFail(req.params[primaryCol]);
        res.send(newObj);
      } catch (e) {
        throw Boom.notFound(e)
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("getAll", (repo) => {
  const routeDetails: RouteOptions = {
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "array",
          items: { $ref: `${getSchemaName(repo.metadata,'fullSchema')}#` },
        },
      },
    },
    handler: async (req, res) => {
      const newObj = await repo.find();
      res.send(newObj);
    },
  };
  return routeDetails;
});

//URGENT TODO: We need a query builder so that we can add stuff like tags and summary in the openapi functionality
APIGenerator.setGenerator("updateOne", (repo) => {
  const primaryCol = getPrimaryColName(repo)
  const routeDetails: RouteOptions = {
    method: "PATCH",
    url: `/:${primaryCol}`,
    schema: {
      body: { $ref: `${getSchemaName(repo.metadata,"updateSchema")}#` },
      response: {
        200: { $ref: `${getSchemaName(repo.metadata,"fullSchema")}#` },
        400: {$ref: `ErrorResponse#`},
        404: {$ref: `ErrorResponse#`}
      },
      params: {
        type: "object",
        properties: {
          [primaryCol]: { type: "number" },
        },
      },
    },
    handler: async (req, res) => {
      try {
        await repo.findOneOrFail(req.params[primaryCol]);
      } catch (e) {
        throw Boom.notFound(e)
      }
      //URGENT TODO: Right now typeorm sqlite does NOT throw an error, even if you save a string in an integer column!!!
      
      try {
        const updatedObj = await repo.save({
          id: req.params[primaryCol],
          //@ts-ignore
          ...req.body,
        });
        res.send(updatedObj);
      } catch (e) {
        throw Boom.badRequest(e)
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("deleteOne", (repo) => {
  const primaryCol = getPrimaryColName(repo)
  const routeDetails: RouteOptions = {
    method: "DELETE",
    url: `/:${primaryCol}`,
    schema: {
      params: {
        type: "object",
        properties: {
          [primaryCol]: { type: "number" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            id: {
              type: ["integer","string"],
            },
          },
          required: ["success", "id"],
        },
        400: {$ref: `ErrorResponse#`},
        404: {$ref: `ErrorResponse#`}

      },
    },
    handler: async (req, res) => {
      try {
        await repo.findOneOrFail(req.params[primaryCol]);
      } catch (e) {
        res.status(404).send(e);
      }
      try {
        await repo.delete(req.params[primaryCol]);
        res.send({
          success: true,
          id: req.params[primaryCol],
        });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  };
  return routeDetails;
});

