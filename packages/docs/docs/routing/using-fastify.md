---
sidebar_position: 1
---

# Accessing Fastify

## Overview

EzBackend is a wrapper of [fastify](https://www.fastify.io/) and [typeorm](https://typeorm.io/)

Hence, it is possible that you need to access the underlying fastify functionality for advanced purposes

## Getting the fastify server instance

### From EzApp (No Instance)

For every `EzApp`, fastify instance functions are exposed for your usage, for example:

```ts
const app = new EzBackend()
const base = new EzApp()

base.get('/',async(req,res) => {
    return {hello:'world'}
})

app.addApp('base', base)

app.start()
```

This creates a route `/` which returns `{hello:'world'}` when a `GET` request is performed

:::info
The function is only registered in the `postHandler` lifecycle
:::

However, this does not get us access to the state of the server, nor the encapsulated instance.

### From handler lifecycle (No Fastify Instance)

However, we may want access to our encapsulated instance, for example when we have added a `Repo` in the tree

We can do this action within the setHandler lifecyle, by accessing instance.server

```ts
const app = new EzBackend()
const base = new EzApp()

app.setHandler("Create Repo", async (instance,opts) => {
    instance.repo = {
        getOne : () => {
            return 'This is a repo'
        }
    }
})

base.setHandler("Use Repo", async(instance,opts) => {
    instance.server.get('/', async(req,res) => {
        return {repo:instance.repo.getOne()}
    })
})

app.addApp('base', base)

app.start()
```

In this way, we have the access to the encapsulated context of the ancestors of the instance, whereas in the previous case we were unable to create routes based on the encapsulated state of the instance

However, `instance.server` does not contain information about the current state of the server, which means that although it emulates many of the FastifyInstance commands, it does not access to stateful commands, such as `getSchemas()` or `.prefix`

```ts
base.setHandler("Get Prefix", async(instance,opts) => {
    console.log(instance.server.prefix) //undefined
    console.log(instance.server.getSchemas()) //undefined
})
```

### From registered plugin (With instance and Fastify Instance)

If you need access to the actual state of the server, then you have to register a plugin as shown below

```ts
const app = new EzBackend()
const base = new EzApp()

base.setHandler("Create Hello World", async(instance,opts) => {
    instance.server.register(async(server,opts) => {
        console.log(server.prefix) // base
        console.log(server.getSchemas()) // Error Response Schema
    })
})

app.addApp('base', base, {prefix: 'base'})

app.start()
```


## Understanding Fastify in the lifecycle

EzBackend utilises fastify in the lifecycle like this:

|lifecycle|action|
|-|-|
|postHandler (1)| Create fastify instance in `instance._server`|
|postHandler (2)| Recursively register fastify plugins|

As a result, the methods from `EzApp` or the `instance.server` in handler lifecycle result do not run at the time of definition. 

Instead, the calling of the functions is deferred to the postHandler lifecycle, which is why you are unable to access the server state.

However, when you use register, you are able to gain access to the server instance at the time it is called in the `postHandler` lifecycle, which means that it has access to the full encapsulated instance by fastify

:::warning
Technically, you can register your functions with `instance.server.register`,but by accessing `instance._server` directly you may lose access to EzApp encapsulation and possibly experience breaking changes in the future
:::