---
sidebar_position: 6
---

# Auto Generated APIs

EzBackend automatically generates API routes from schemas defined by the user

## Default Routes

By default, EzBackend generates the following routes:

| Route Name | Method | URL    | Action                                |Nested|
| ---------- | ------ | ------ | ------------------------------------- |------|
| createOne  | POST   | `/`    | Create a single entry in the database |✅|
| getOne     | GET    | `/:id` | Get a single entry in the database    |✅|
| updateOne  | PATCH  | `/:id` | Update a single entry in the database |❌|
| deleteOne  | DELETE | `/:id` | Delete a single entry in the database |❌|

## Making your own route API

Making a custom endpoint for your model is one of the many things you can customise in EzBackend

### A practical example

Assuming we want a 'getAll' API, we can do so like this

<!-- TODO: Break down this extremely chonky code for the user -->

:::info
Right now its pretty complicated, but we will be expanding the EzBackend API soon to make this more seamless
:::

```ts
import {response, EzModel} from '@ezbackend/common'

EzModel.setAPIgenerator("getAll", (ezModel) => {
  const routeDetails: RouteOptions = {
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "array",
          items: ezModel.getJsonSchema(true),
        },
        400: response.badRequest,
      },
    },
    async handler(req, res) {
      const allObj = await ezModel.model.findAll(
        EzModel.associationOptions(ezModel.model)
      );
      res.send(allObj.map(obj => obj.toJSON()));
    },
  };
  return routeDetails
});
```

### Understanding API generation

An EzModel is structured like this:

<!-- TODO: Update this when relations enter the scene (Although it is probably better we get the relations from the model itself)-->

```ts
class EzRouter {
    apis: {keys: () => route:RouteOptions}
    routePrefix: string
}

class EzModel extends EzRouter {
    model: Model
}
```

EzBackend automatically generates routes by

1. finding all the instances of EzRouters (or instances inheriting from EzRouter) exported from the main file
1. Then running `registerRoutes()` on them.

`registerRoutes()` gets all the functions `() => {RouteOptions}` and the creates an api for it based on the specification for `fastify.route(options:RouteOptions)`

