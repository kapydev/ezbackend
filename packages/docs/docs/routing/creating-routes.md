---
sidebar_position: 1
---

# Creating Routes

## HTTP Methods

You can define any HTTP Route you need with these shorthand methods

<!-- URGENT TODO: Fix bug where defining routes on EzBackend itself does not appear on openapi -->
```ts
const app = new EzBackend()
const base = new EzApp()

base.get('/', async(req,res) => {
  return {hello:'world'}
})

base.post('/', async(req,res) => {
  return req.body
})

base.patch('/', async(req,res) => {
  return req.body
})

base.delete('/', async(req,res) => {
  return req.body
})

app.addApp('base',base)
app.start()
```

## Route Prefixing
EzApps are the core of EzBackend, and they power the entire encapsulation system. When adding apps to apps, you can specify the prefix in the options in order to prefix all the routes in the app and all children apps

```ts {8}
const app = new EzBackend()
const base = new EzApp()

base.get('/', async(req,res) => {
  return {hello:'world'}
})

app.addApp('base',base, {prefix:'base'}) //PREFIX HERE
app.start()
```

## Possible Routing Methods

There are two main methods of creating routes (And a third method advanced method discussed [here](using-fastify#from-registered-plugin-with-instance-and-fastify-instance))

```ts
const app = new EzBackend()
const base = new EzApp()

//METHOD 1
base.get('/method1',async(req,res) => {
    return {hello:'world'}
})

//METHOD 2
base.setHandler("Method 2", async(instance,opts) => {
    instance.server.get('/method2', async(req,res) => {
        return {hello:'world'}
    })
})

app.addApp('base', base)

app.start()
```

Both methods are the same, however each method has their pros and cons

|Method|Pros|Cons|
|-|-|-|
|1|Shorter Syntax|No instance access|
|2|Instance access|Longer Syntax|

There are several other methods for creating routes as well, for exampl