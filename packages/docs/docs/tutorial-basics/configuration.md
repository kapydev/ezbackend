---
sidebar_position: 4
---

# Configuration

EzBackend is designed from the bottom up to be extremely customisable, so that you can customise everything.

However, for simpler customisations, a `config.ts` file exists in `.ezb` to allow the user easy configuration of the fastify and sequelize instance (Assuming you are using fastify and sequelize)

## Default Config

The default config file may look like this

<!-- TODO: Make the default config generate from the actual default config -->

```ts
import path from "path";

export default {
  port: 8888,
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    logger: {
      prettyPrint: {
        translateTime: "SYS:HH:MM:ss",
        ignore: "pid,hostname,reqId,responseTime,req,res",
        messageFormat: "[{req.method} {req.url}] {msg}",
      },
    },
  },
  orm: {
    logging: false,
  },
  entryPoint: path.resolve(__dirname, "index.ts"),
  connectionURI: "sqlite::memory"
  plugins: [
    "@ezbackend/common",
    "@ezbackend/openapi"
  ]
};
```

### Understanding the config

`port` - The port on which the server runs on. e.g in this case your server runs at [http://localhost:8888](http://localhost:8888)

`server` - The options that get passed to fastify. e.g 
```ts
import fastify from 'fastify'
const server = fastify(options.server)
```

`connectionURI` - the connection URI as specified [here](https://sequelize.org/master/manual/getting-started.html)
`orm` - The options that get passed to sequelize.
```ts
import {Sequelize} from 'sequelize'
const sequelize = new Sequelize(options.connectionURI, options.orm)
```

`entryPoint` - The filename of the file where your models are specified. `path.resolve(__dirname, "index.ts")` will always resolve to an `index.ts` file in the same folder as `config.ts`

## Understanding plugins

EzBackend is designed to be extremely extensible, in other words everything should be a plugin. To illustrate this point, EzBackend is built like this:

```
@ezbackend/core
|_ @ezbackend/common (Plugin to generate API routes automatically)
|_ @ezbackend/openapi (Plugin to generate docs automatically)
```

Everything in ezbackend can be achieved with plugins, and you can understand about how they work [here](/)
<!-- TODO: Add in actual description of how plugins work -->