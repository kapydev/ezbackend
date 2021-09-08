---
sidebar_position: 6
---

# Auto Generated APIs

EzBackend automatically generates API routes from schemas defined by the user

## Default Routes

By default, EzBackend generates the following routes:

| Route Name | Method | URL    | Action                                |
| ---------- | ------ | ------ | ------------------------------------- |
| createOne  | POST   | `/`    | Create a single entry in the database |
| getAll     | GET    | `/`    | Get all entries in the database       |
| getOne     | GET    | `/:id` | Get a single entry in the database    |
| updateOne  | PATCH  | `/:id` | Update a single entry in the database |
| deleteOne  | DELETE | `/:id` | Delete a single entry in the database |

All the routes support nested functionality, and you can see more details [here](/docs/tutorial-basics/relations#nested-functionality)

## Removing Default Routes

You can include only specific routes, or exclude specific routes easily by specifying the routes required in `@EzModel`

`include` - Only the routes in the array will be generated

`exclude` - Only the routes not in the array will be generated

```ts title=Model
@EzModel({
  include: ['createOne','getAll','getOne','updateOne','deleteOne']
  exclude: ['createOne','getAll','getOne','updateOne','deleteOne']
})
export class User {
  .
  .
  .
}

```


## Making your own route API

Making a custom endpoint for your model is one of the many things you can customise in EzBackend

### A practical example

Assuming we want a 'getAll' API, we can do so like this

<!-- TODO: Break down this extremely chonky code for the user -->

:::info
Right now its pretty complicated, but we will be expanding the EzBackend API soon to make this more seamless
:::

```ts
import {APIGenerator} from "@ezbackend/common"

APIGenerator.setGenerator("getAll", (repo) => {
  const routeDetails:RouteOptions = {
    method: "GET",
    url: "/",
    schema: {
    },
    handler: async(req,res) => {
      //@ts-ignore
      const newObj = await repo.find(req.params.id);
      res.send(newObj);
    }
  }
  return routeDetails; 
})
```

### Understanding API Generation

:::info
Coming soon
:::

