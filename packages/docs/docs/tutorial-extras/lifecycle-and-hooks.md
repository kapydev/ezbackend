---
sidebar_position: 1
---

# Lifecycle and Hooks

EzBackend allows you to create custom plugins by hooking your plugins into any part of the EzBackend lifecycle as you so wish

TODO: Make hooks into functions instead of replacing properties because thats kinda weird

## An introduction to lifecycle and hooks

EzBackend's lifecycle is as shown below, with code running from top to bottom.

```
preInit
|_preInit[0]
|_preInit[1]
|
init
|
postInit
|_postInit[0]
|_postInit[1]
|
preHandler
|_preHandler[0]
|_preHandler[1]
|
handler
|
postHandler
|_postHandler[0]
|_postHandler[1]
|
preRun
|_preRun[0]
|_preRun[1]
|
run
|
postRun
|_postRun[0]
|_postRun[1]
```

All of the `pre` and `post` parts of the lifecycles are arrays, whereas everything else is a single function

When you run `import EzBackend from '@ezbackend/core`, there are no functions in the lifecycle

Then when you add `@ezbackend/common` as a plugin, the below happens:

```
.
|
init[🎣Create sequelize and fastify instance]
|
.
|
handler[🎣Import models from index.ts and register routes]
|
.
|
run[🎣Sync DB tables and start server]
|
.
```

As you can see we have 🎣hooked🎣 onto the lifecycle the commands to automatically start a server based on just a provided schema!

Let's look at an actual example from how `init` in `@ezbackend/common` is implemented
<!-- TODO: Keep this updated from the code -->

```ts
const ezb = EzBackend.app() as EzBackend;


//Configure defaults
ezb.plugins.init = (ezb, opts, cb) => {
  ezb.sequelize = new Sequelize("sqlite::memory", opts.orm);
  ezb.server = fastify(opts.server);
  cb();
};
```

:::caution
Editing the `init`, `handler` and `run` functions directly may cause future problems, because these functions will probably be edited by our one click deploy in the future
:::

This system uses [avvio by fastify](https://github.com/fastify/avvio) to declare every function at each step as a plugin, so that regardless of whether plugins are asynchronous or not they will still load in the same order

Hence, for making a real plugin we should instead be creating pre and post hooks.

Let's look at an actual example from `@ezbackend/openapi`, the plugin for generating documentation

```
.
|
init[Create sequelize and fastify instance]
|
postInit
|_[🎣register swagger]
|
handler[Import models from index.ts and register routes]
|
.
|
run[Sync DB tables and start server]
|
postRun
|_[🎣run swagger and open documentation]
```

So, instead of replacing the function entirely, we append the function, which means that each plugin can add an additional hook without removing hooks from previous plugins

The actual implementation for running open api is something like this:

```ts
ezb.plugins.postRun.push(()=> {
  ezb.server.swagger();
  if (ezb.options.server.port) open(`http://localhost:${ezb.options.server.port}/docs`);
})
```