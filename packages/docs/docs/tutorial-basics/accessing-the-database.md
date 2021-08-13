---
sidebar_position: 3
---

# Accessing the database

If you want to assess the database, you must first understand that EzBackend is a wrapper of [fastify](https://www.fastify.io/) and [sequelize](https://sequelize.org/master/)

Hence, when thinking about creating an API route, we should be thinking of accessing the database using sequelize [fastify api route](https://www.fastify.io/docs/latest/Routes/)

## Understanding Sequelize

Sequelize is an [Object Relational Mapper (ORM)](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one) for the SQL databases Postgres, MySQL, MariaDB, SQLite and Microsoft SQL server.

It lets you connect to any of the databases with the same code. Want to change from SQLite to Postgres? Just change the configuration and everything will still work.

## Getting the sequelize model

For each `EzModel`, there is a Sequelize `Model` which can access from `ezModel.model`

Let's say we have a table of users

```ts title="User Model"
export const user = new EzModel("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
```

We can get the sequelize model like this:

```ts title=".ezb/index.ts"
const model = user.model; //model refers to the sequelize model
```

Now that we have the sequelize model, it is more a problem of ['How do I use the sequelize model?'](https://sequelize.org/v5/manual/models-usage.html/)?

## A practical example

Assuming we want an api endpoint that lets us know the number of users

```ts title="API Endpoint"
fastify.route({
  method: "GET",
  url: "/num-users",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          numUsers: { type: "number" },
        },
      },
    },
  },
  handler: async function (request, reply) {
    reply.send(await getNumUsers());
  },
});
```

So instead of googling "How to get number of users for ezbackend" we can google ["How to get number of rows in a table sequelize"](https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database)

So the function `getNumUsers` may look like this

```ts title="getNumUsers"
async function getNumUsers() {
  const numUsers = await user.model.count();
  return numUsers;
}
```

And with that we can now have an api route that gives us the total number of users

## Putting it together

For a working example, you can copy and past the below code into `.ezb/index.ts`

```ts ./ezb/index.ts
import { EzBackend, EzModel } from "@ezbackend/common";

const ezb = EzBackend.app(); //This gets the singleton
const fastify = ezb.server; //This lets you get the fastify instance from anywhere

export const user = new EzModel("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function getNumUsers() {
  const numUsers = await user.model.count();
  return numUsers;
}

fastify.route({
  method: "GET",
  url: "/num-users",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          numUsers: { type: "number" },
        },
      },
    },
  },
  handler: async function (request, reply) {
    reply.send({ numUsers: await getNumUsers() });
  },
});
```

:::info

You can access the sequelize instance directly with

```ts
const ezb = EzBackend.app();
const sequelize = ezb.orm;
```

:::
