import { EzBackend } from "../definitions";
import { RouteOptions } from "fastify";
import * as response from "./generic-response";
import * as _ from "lodash"; //TODO: Tree shaking
import { Entity, Repository } from "typeorm";

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

APIGenerator.setGenerator("createOne", (repo) => {
  const routeDetails: RouteOptions = {
    method: "POST",
    url: "/",
    schema: {
      body: {},
    },
    handler: async (req, res) => {
      if (req.body["id"]) {
        throw "Cannot specify id for create request";
      }
      try {
        const newObj = await repo.save(req.body);
        res.send(newObj);
      } catch (e) {
        //Assumption: If it fails, it is because of a bad request, not the code breaking
        res.status(400).send(e);
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("getOne", (repo) => {
  const routeDetails: RouteOptions = {
    method: "GET",
    url: "/:id",
    schema: {
      params: response.singleID,
    },
    handler: async (req, res) => {
      //TODO: Better status code
      try {
        //@ts-ignore
        const newObj = await repo.findOneOrFail(req.params.id);
        res.send(newObj);
      } catch (e) {
        res.status(404).send(e);
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("getAll", (repo) => {
  const routeDetails: RouteOptions = {
    method: "GET",
    url: "/",
    schema: {},
    handler: async (req, res) => {
      //@ts-ignore
      const newObj = await repo.find(req.params.id);
      res.send(newObj);
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("updateOne", (repo) => {
  const routeDetails: RouteOptions = {
    method: "PATCH",
    url: "/:id",
    schema: {
      body: {},
      params: response.singleID,
    },
    handler: async (req, res) => {
      try {
        //@ts-ignore
        await repo.findOneOrFail(req.params.id);
      } catch (e) {
        res.status(404).send(e);
      }
      //URGENT TODO: Right now typeorm sqlite does NOT throw an error, even if you save a string in an integer column!!!
      try {
        const updatedObj = await repo.save({
          //@ts-ignore
          id: req.params.id,
          //@ts-ignore
          ...req.body,
        });
        res.send(updatedObj);
      } catch (e) {
        res.status(400).send(e);
      }
    },
  };
  return routeDetails;
});

APIGenerator.setGenerator("deleteOne", (repo) => {
  const routeDetails: RouteOptions = {
    method: "DELETE",
    url: "/:id",
    schema: {
      params: response.singleID,
    },
    handler: async (req, res) => {
      try {
        //@ts-ignore
        await repo.findOneOrFail(req.params.id);
      } catch (e) {
        res.status(404).send(e);
      }
      try {
        //@ts-ignore
        const newObj = await repo.delete(req.params.id);
        res.send({
          success: true,
          //@ts-ignore
          id: req.params.id,
        });
      } catch (e) {
        res.status(400).send(e);
      }
    },
  };
  return routeDetails;
});

export * as response from "./generic-response";
