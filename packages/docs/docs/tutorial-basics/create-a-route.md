---
sidebar_position: 3
---

# Create an API Route





If you want to create an API route, you must first understand that EzBackend is a wrapper of [fastify](https://www.fastify.io/) and [typeorm](https://typeorm.io/)

Hence, when thinking about creating an API route, we should be thinking of making a [fastify api route](https://www.fastify.io/docs/latest/Routes/)

## Getting the fastify server instance

The EzBackend instance uses the singleton pattern so that you can access the fastify and sequelize instances anywhere.

:::info Info
Singleton means that for a class, no matter where you call it from, you will get the same instance.

For example if you changed something in `EzBackend.app()` from `index.ts`, it would change in all other files as well
:::

```ts title=".ezb/index.ts"
import {EzBackend} from "@ezbackend/core"

const ezb = EzBackend.app() //This gets the singleton
const fastify = ezb.server //This lets you get the fastify instance from anywhere

```

Now that we have the fastify instance, it is more a problem of ['How do I create a route using fastify'](https://www.fastify.io/docs/latest/Routes/)?

## Creating an api route using fastify

The below is an example of how to create an API route that adds two numbers

```ts title=".ezb/index.ts"
fastify.route({
  method: 'POST',
  url: '/add-two',
  schema: {
    body: {
      number1: { type: 'number' },
      number2: { type: 'number' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          sum: { type: 'number' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ sum: request.body.number1 + request.body.number2 })
  }
})

```

So creating and api route is as simple as creating the route with fastify. For additional details creating a route with fastify click [here](https://www.fastify.io/docs/latest/Routes/)


## Putting it together

For a working example, you can copy and past the below code into `.ezb/index.ts`

```ts ./ezb/index.ts
import {EzBackend} from "@ezbackend/common"

const ezb = EzBackend.app() //This gets the singleton
const fastify = ezb.server //This lets you get the fastify instance from anywhere

fastify.route({
  method: 'POST',
  url: '/add-two',
  schema: {
    body: {
      number1: { type: 'number' },
      number2: { type: 'number' }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          sum: { type: 'number' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ sum: request.body.number1 + request.body.number2 })
  }
})
```

:::note
An upcoming feature is to make one line of code

```ts
EzBackend.addAPI((request:Request, reply: Reply) {
  ...
})
```

Automatically generate the schemas from the types `Request` and `Reply`, and automatically generate the error codes as well

However, we need your support to implement this feature. Please contact us at we.are.collaboroo@gmail.com to tell us why you need it 😊
:::