import { FastifyInstance, RouteOptions } from 'fastify';

import { AnyStrategy } from 'fastify-passport/dist/strategies';
import { BaseProvider } from './base';
import type { EzBackendInstance } from '@ezbackend/common';
import { EzError } from '@ezbackend/utils';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ProviderOptions } from '.';
import fastifyPassport from 'fastify-passport';

interface GoogleProviderOptions extends ProviderOptions {
  googleClientId: string;
  googleClientSecret: string;
  // TODO: Strict typechecking for allowed google scopes
  scope: Array<string>;
}

declare module '../auth' {
  interface EzBackendAuthOpts {
    google?: GoogleProviderOptions;
  }
}

export class GoogleProvider extends BaseProvider {
  constructor(modelName: string) {
    super('google', modelName);
  }

  // TODO: Figure out why its not getting the types from the abstract class
  addStrategy(
    instance: EzBackendInstance,
    server: FastifyInstance,
    opts: any,
  ): [name: string, Strategy: AnyStrategy] {
    const that = this;

    if (
      opts.googleClientId === undefined ||
      opts.googleClientSecret === undefined
    ) {
      throw new EzError(
        'Google Client ID and Client Secret not found',
        'The Google Client ID and Client Secret are used to authenticate EzBackend to provide the google login',
        'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env file in the root (Same folder as package.json), or specify the option in app.start({...})',
        'https://www.ezbackend.io/docs/auth/user-auth#creating-the-user',
      );
    }

    const googleStrategy = new GoogleStrategy(
      {
        clientID: opts.googleClientId,
        clientSecret: opts.googleClientSecret,
        callbackURL: this.getCallbackURL(server),
      },
      function (accessToken, refreshToken, profile, cb) {
        that.defaultCallbackHandler(instance, profile.id, profile, cb);
      },
    );

    return [this.providerName, googleStrategy];
  }

  getLoginRoute(server: FastifyInstance, opts: any): RouteOptions {
    return {
      method: 'GET',
      url: `/${this.getRoutePrefixNoPrePostSlash(server)}/login`,
      // preValidation: fastifyPassport.authenticate('google', { scope: this.providerOptions.scope }),
      handler: fastifyPassport.authenticate('google', { scope: opts.scope }),
      schema: {
        // TODO: Figure out how to import types for summary
        // @ts-ignore
        tags: ['Google Auth'],
        // @ts-ignore
        summary: `Login for model '${this.modelName}' with provider ${this.providerName}`,
        description: `# 🔑 [CLICK HERE](/${this.getFullRoutePrefixNoPrePostSlash(
          server,
        )}/login) or visit the URL with this extension to login
                1. Creates/Updates '${this.modelName}' on login
                2. Provider ${this.providerName}
                3. Scopes: ${opts.scope.toString()}`,
      },
    };
  }

  // TODO: Mock and test these logout routes
  // URGENT TODO: Why does this logout route not seem to be logging the user out?
  getLogoutRoute(server: FastifyInstance, opts: any): RouteOptions {
    return {
      method: 'GET',
      url: `/${this.getRoutePrefixNoPrePostSlash(server)}/logout`,
      handler: (req, res) => this.defaultLogoutHandler(req, res, opts),
      schema: {
        // TODO: Figure out how to import types for summary
        // @ts-ignore
        tags: ['Google Auth'],
        // @ts-ignore
        summary: `Logout for model '${this.modelName}' with provider ${this.providerName}`,
        description: `# 🔑 [CLICK HERE](/${this.getFullRoutePrefixNoPrePostSlash(
          server,
        )}/logout) or visit the URL with this extension to logout`,
      },
    };
  }

  getCallbackRoute(server: FastifyInstance, opts: any): RouteOptions {
    const callbackRoute = `/${this.getRoutePrefixNoPrePostSlash(
      server,
    )}/callback`;
    return {
      method: 'GET',
      url: callbackRoute,
      preValidation: fastifyPassport.authenticate('google', {
        scope: opts.scope,
        successRedirect: opts.successRedirectURL,
        failureRedirect: opts.failureRedirectURL,
      }),
      handler: function (req, res) {
        res.redirect(opts.successRedirectURL);
      },
      schema: {
        // @ts-ignore
        tags: ['Google Auth'],
        // @ts-ignore
        summary: `Callback Route for model '${this.modelName}' with provider ${this.providerName}`,
        description: `Google redirects to this URL with the user's details. This route must be specified in the google callback URLs`,
      },
    };
  }
}
