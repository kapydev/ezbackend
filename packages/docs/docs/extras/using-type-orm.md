---
sidebar_position: 4
---

# Accessing TypeORM

If you want to assess the database, you must first understand that EzBackend is a wrapper of [fastify](https://www.fastify.io/) and [typeorm](https://typeorm.io/)

Hence, when thinking about accessing the database, we should be thinking of accessing the database using typeorm

## Understanding TypeORM

TypeORM is an [Object Relational Mapper (ORM)](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one) for the SQL databases Postgres, MySQL, MariaDB, SQLite and Microsoft SQL server.

It lets you connect to any of the databases with the same code. Want to change from SQLite to Postgres? Just change the configuration and everything will still work.

## Getting the TypeORM connection

You can get the TypeORM connection within the lifecycle hooks with `instance.orm`

```ts title=".ezb/index.ts"
const app = new EzBackend();

app.setHandler('Check TypeORM Connection', async (instance, opts) => {
  console.log(instance.orm);
});

app.start();
```

:::caution

The connection is only created in the postInit hook, so you can only access in lifecycle hooks after that.

:::

Now that we have the TypeORM connection, we can solve all our problems by asking ourselves the question ['How do I use the TypeORM connection?'](https://typeorm.io/#/connection)?

## Accessing the TypeORM Repo

Both the classes `EzModel` and `EzRepo` decorate the instance with a repository directly linked to the model created. The repository is a TypeORM Repository

```ts
const app = new EzBackend();

const model = new EzModel('Model', {
  //Or EzRepo
  var1: Type.VARCHAR,
  var2: Type.DATE,
});

model.setHandler('Check TypeORM Repo', async (instance, opts) => {
  console.log(instance.repo);
});

app.addApp('model', model, { prefix: 'model' });
app.start();
```
