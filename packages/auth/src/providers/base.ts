import { EzApp, EzBackendInstance, EzBackendOpts } from "@ezbackend/common";
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteOptions,
} from "fastify";

import { AnyStrategy } from "fastify-passport/dist/strategies";
import {
  DeserializeFunction,
  SerializeFunction,
} from "fastify-passport/dist/Authenticator";
import { EzBackendAuthOpts, defaultConfig } from "../auth";
import fastifyPassport from "fastify-passport";

// TODO: Generate this type more programatically to only have types introduced by user
declare module "fastify" {
  interface PassportUser {
    [index: string]: any;
  }
}

export interface ProviderOptions {
  /**
   * @deprecated Instead of using {google:{successRedirectURL:...}}
   * use
   * {successRedirectURL:...}
   */
  successRedirectURL?: string;
  /**
   * @deprecated Instead of using {google:{failureRedirectURL:...}}
   * use
   * {failureRedirectURL:...}
   */
  failureRedirectURL?: string;
}

type ProviderName = keyof EzBackendAuthOpts;

export abstract class BaseProvider extends EzApp {
  providerName: ProviderName;
  modelName: string;

  constructor(providerName: ProviderName, modelName: string) {
    super();
    this.providerName = providerName;
    this.modelName = modelName;

    this.setDefaultOpts(defaultConfig);

    this.setHandler(
      `Add ${this.providerName} Auth Provider`,
      async (instance, opts) => {
        this.addProvider(instance, opts);
      },
    );
  }

  // URGENT TODO: Add type for provider opts
  abstract addStrategy(
    instance: EzBackendInstance,
    server: FastifyInstance,
    opts: any,
  ): [name: string, Strategy: AnyStrategy];

  abstract getLoginRoute(server: FastifyInstance, opts: any): RouteOptions;
  abstract getLogoutRoute(server: FastifyInstance, opts: any): RouteOptions;
  abstract getCallbackRoute(server: FastifyInstance, opts: any): RouteOptions;
  // TODO: Implement this security scheme in the swagger spec
  // abstract getSecurityScheme():{[name:string]:OpenAPIV3.SecuritySchemeObject}

  addProvider(instance: EzBackendInstance, fullOpts: EzBackendOpts) {
    const opts = this.getOpts("auth", fullOpts);

    // URGENT TODO: Double check edge cases for this
    const providerOpts = {
      ...(opts[this.providerName] as ProviderOptions),
      ...opts,
    };

    instance.server.register(async (server, opts) => {
      const [name, Strategy] = this.addStrategy(instance, server, providerOpts);
      fastifyPassport.use(name, Strategy);
      fastifyPassport.registerUserSerializer(
        this.registerUserSerializer(instance, providerOpts),
      );
      fastifyPassport.registerUserDeserializer(
        this.registerUserDeserializer(instance, providerOpts),
      );

      // TODO: Fix these typescript errors
      server.route(this.getLoginRoute(server as any, providerOpts) as any);
      server.route(this.getLogoutRoute(server as any, providerOpts) as any);
      server.route(this.getCallbackRoute(server as any, providerOpts) as any);
    });
  }

  getRoutePrefixNoPrePostSlash(server: FastifyInstance) {
    const fullRoute = `auth/${this.providerName}`;
    return fullRoute;
  }

  getFullRoutePrefixNoPrePostSlash(server: FastifyInstance) {
    const encapsulatedPrefix = server.prefix.replace(/^\//, "");
    if (encapsulatedPrefix === "") {
      return this.getRoutePrefixNoPrePostSlash(server);
    } else {
      return `${encapsulatedPrefix}/${this.getRoutePrefixNoPrePostSlash(
        server,
      )}`;
    }
  }

  getCallbackURL(server: FastifyInstance) {
    const urlPath = `${this.getFullRoutePrefixNoPrePostSlash(server)}/callback`;
    let result;
    if (process.env.NODE_ENV === "production" && process.env.PRODUCTION_URL) {
      const callbackURL = new URL(urlPath, process.env.PRODUCTION_URL).href;
      result = callbackURL;
    } else {
      result = `/${urlPath}`;
    }
    return result;
  }

  defaultCallbackHandler(
    instance: EzBackendInstance,
    id: string | number,
    profile: any,
    cb: (
      err?: string | Error | null | undefined,
      user?: Express.User | undefined,
      info?: any,
    ) => void,
  ) {
    const repo = instance.orm.getRepository(this.modelName);
    const model = {
      [`${this.providerName}Id`]: id,
      [`${this.providerName}Data`]: profile,
    };

    const serializedID = `${this.providerName}-${id}`;
    repo.save(model).then(
      () => {
        cb(undefined, serializedID);
      },
      (e) => {
        if (String(e.driverError).toLowerCase().includes("unique")) {
          // URGENT TODO: Check if this works for all databases
          cb(undefined, serializedID);
        } else {
          cb(e);
        }
      },
    );
  }

  // TODO: Explicit types for opts
  defaultLogoutHandler(req: FastifyRequest, res: FastifyReply, opts: any) {
    req.logOut().then(() => {
      // TODO: Explicity type opts
      res.redirect(opts.successRedirectURL);
    });
  }

  registerUserSerializer(
    instance: EzBackendInstance,
    opts: any,
  ): SerializeFunction<unknown, unknown> {
    return async function serializer(id, req) {
      return id;
    };
  }

  registerUserDeserializer(
    instance: EzBackendInstance,
    opts: any,
  ): DeserializeFunction<any, any> {
    const that = this;
    return async function deserializer(providerAndId: string, req) {
      if (providerAndId.startsWith(`${that.providerName}-`)) {
        // TODO: Consider the security implications of not checking that the replacement starts at 'google-'
        const id = providerAndId.replace(`${that.providerName}-`, "");
        const userRepo = instance.orm.getRepository(that.modelName);
        const fullUser = await userRepo.findOne({
          [`${that.providerName}Id`]: id,
        });
        if (fullUser) {
          return fullUser;
        } else {
          // Logout the user if correct provider prefix but not in DB
          return null;
        }
      } else {
        // TODO: Create test case for this, it needs to be exactly the string pass, which code factor may randomly decide to change
        // THIS NEEDS TO BE EXACTLY THE STRING PASS, OTHERWISE IT WILL FAIL
        // tslint:disable-next-line:no-string-throw
        // eslint-disable-next-line no-throw-literal
        throw "pass";
      }
    };
  }
}
