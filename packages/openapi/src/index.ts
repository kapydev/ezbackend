import { IEzbConfig } from '@ezbackend/core';
import { mixedInstance } from 'avvio';
import { EzBackend } from '@ezbackend/core'
import { APIGenerator, getPrimaryColName } from "@ezbackend/common";
import { RouteOptions } from 'fastify';
import fastifySwagger from "fastify-swagger"
import chalk from 'chalk'
import './definitions'

const ezb = EzBackend.app();

ezb.openapi = {
  config: {
    prefix: "/docs",
    routePrefix: "/docs",
    exposeRoute: true,
    //TODO: Figure out why its logging so much
    logLevel: 'warn',
    openapi: {
      info: {
        title: "EzBackend API",
        description: "Automatically generated documentation for EzBackend",
        version: "1.0.0",
      },
      externalDocs: {
        url: "https://github.com/kapydev/ezbackend",
        description: "Find more info here",
      }
    },
    
  }
}

// components: {
//   securitySchemes: {
//     OAuth2: {
//       type: "oauth2",
//       description: "## ⚠️Do not fill client id, just click __'Authorize'__ [(explanation)](http://google.com)",
//       flows:
//       {
//         implicit: {
//           authorizationUrl: 'http://localhost:8888/User/auth/google/login',
//           scopes: {
//           }
//         }
//       }
//     }
//   }
// }
//   },
// }

//Configure defaults
ezb.plugins.postInit.push((ezb, opts, cb) => {
  ezb.server.register(fastifySwagger,ezb.openapi.config);
cb()
});

const originalGenerators = APIGenerator.getGenerators()

if (originalGenerators['createOne'] !== undefined) {
  const oldGenerator = originalGenerators['createOne']
  APIGenerator.setGenerator("createOne", (repo) => {
    const routeDetails = oldGenerator(repo)
    const generatedCols = repo.metadata.columns.filter(col => col.isGenerated).map(col => col.propertyName)
    return {
      ...routeDetails,
      schema: {
        ...routeDetails.schema,
        summary: `Create ${repo.metadata.name}`,
        tags: [repo.metadata.name],
        description: `During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()}).
        All non nullable columns must be specified on creation`
      }
    }
  });
}

if (originalGenerators['getOne'] !== undefined) {
  const oldGenerator = originalGenerators['getOne']
  APIGenerator.setGenerator("getOne", (repo) => {
    const primaryColName = getPrimaryColName(repo)
    const routeDetails = oldGenerator(repo)
    return {
      ...routeDetails,
      schema: {
        ...routeDetails.schema,
        summary: `Get ${repo.metadata.name} by ${primaryColName}`,
        tags: [repo.metadata.name],
        description: `If the ${primaryColName} does not contain the value specified in the url paramters, there will be a 'not found' error.`
      }
    }
  });
}

if (originalGenerators['getAll'] !== undefined) {
  const oldGenerator = originalGenerators['getAll']
  APIGenerator.setGenerator("getAll", (repo) => {
    const routeDetails = oldGenerator(repo)
    return {
      ...routeDetails,
      schema: {
        ...routeDetails.schema,
        summary: `Get all ${repo.metadata.name} instances`,
        tags: [repo.metadata.name],
        description: `If none exist, an empty array is returned`
      }
    }
  });
}


if (originalGenerators['updateOne'] !== undefined) {
  const oldGenerator = originalGenerators['updateOne']
  APIGenerator.setGenerator("updateOne", (repo) => {
    const primaryColName = getPrimaryColName(repo)
    const routeDetails = oldGenerator(repo)
    const generatedCols = repo.metadata.columns.filter(col => col.isGenerated).map(col => col.propertyName)
    return {
      ...routeDetails,
      schema: {
        ...routeDetails.schema,
        summary: `Update ${repo.metadata.name} by ${primaryColName}`,
        tags: [repo.metadata.name],
        description: `The ${repo.metadata.name} with the ${primaryColName} specified must exist, otherwise a 'not found' error is returned
        During creation, you are not allowed to specify the values of generated columns (e.g. ${generatedCols.toString()})`
      }
    }
  });
}

if (originalGenerators['deleteOne'] !== undefined) {
  const oldGenerator = originalGenerators['deleteOne']
  APIGenerator.setGenerator("deleteOne", (repo) => {
    const primaryColName = getPrimaryColName(repo)
    const routeDetails = oldGenerator(repo)
    return {
      ...routeDetails,
      schema: {
        ...routeDetails.schema,
        summary: `Delete ${repo.metadata.name} by ${primaryColName}`,
        tags: [repo.metadata.name],
        description: `The ${repo.metadata.name} with the ${primaryColName} specified must exist, otherwise a 'not found' error is returned`
      }
    }
  });
}





//URGENT TODO: Generate Schemas for openapi properly
//TODO: Make page when user reopens swagger
ezb.plugins.postRun.push((ezb: mixedInstance<EzBackend>, opts: IEzbConfig, cb) => {
  // ezb.server.swagger();
  if (opts.port) {
    console.log(chalk.greenBright(`\nView your auto-generated Documentation at `) + chalk.yellow.underline(`http://localhost:${opts.port}/docs\n`))
  }
  cb()
})

export * from './definitions'