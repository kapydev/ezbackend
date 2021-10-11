---
sidebar_position: 5
---

# Configuration

EzBackend is designed from the bottom up to be extremely customisable, so that you can customise everything.

However, for simpler customisations, a `config.ts` file exists in `.ezb` to allow the user easy configuration of the fastify and sequelize instance (Assuming you are using fastify and sequelize)

## Default Config

By default, running EzBackend looks like this

```ts
const app = new EzBackend()

app.start()
```

However, under the hood this comes with a default configuration, that is illustrated below
<!-- TODO: Make the default config generate from the actual default config -->

```ts
const app = new EzBackend()

app.start({
    port: 8000,
    server: {
        logger: {
          prettyPrint: {
            translateTime: "SYS:HH:MM:ss",
            ignore: "pid,hostname,reqId,responseTime,req,res",
            messageFormat: "[{req.method} {req.url}] {msg}",
          },
        },
      },
    orm: {
        type: "sqlite",
        database: ":memory:",
        synchronize: true
    },
    auth: {
        secretKeyPath: path.join(process.cwd(), 'secret-key'),
        google: {
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
            backendURL: process.env.BACKEND_URL,
            scope: ['profile'],
            successRedirectURL: "http://localhost:8888/docs",
            failureRedirectURL: "http://localhost:8888/docs"
        }
    }
})

```

### Understanding the config

`port` - The port on which the server runs on. e.g in this case your server runs at [http://localhost:8888](http://localhost:8888)

`server` - The options that get passed to fastify. e.g 
```ts
import fastify from 'fastify'
const server = fastify(options.server)
```

`orm` - The options that get passed to typeorm.
```ts
import {createConnection} from 'typeorm'
const connection = await createConnection(opts.orm);
```

`auth` - The options that get passed to the auth module. For now all of the available options are shown in the defaults.
<!-- URGENT TODO: Provide better explanation of auth defaults -->