---
sidebar_position: 4
---

# Accessing the database

If you want to assess the database, you must first understand that EzBackend is a wrapper of [fastify](https://www.fastify.io/) and [typeorm](https://typeorm.io/)

Hence, when thinking about accessing the database, we should be thinking of accessing the database using typeorm

## Understanding TypeORM

TypeORM is an [Object Relational Mapper (ORM)](https://stackoverflow.com/questions/1279613/what-is-an-orm-how-does-it-work-and-how-should-i-use-one) for the SQL databases Postgres, MySQL, MariaDB, SQLite and Microsoft SQL server.

It lets you connect to any of the databases with the same code. Want to change from SQLite to Postgres? Just change the configuration and everything will still work.

## Getting the TypeORM connection

You can get the TypeORM connection with

```ts title=".ezb/index.ts"
import {EzBackend} from "@ezbackend/core"

const ezb = EzBackend.app() //This gets the singleton
const connection = ezb.orm //This lets you get the connection instance from anywhere

```

Now that we have the sequelize model, we can solve all our problems by asking ourselves the question ['How do I use the TypeORM connection?'](https://typeorm.io/#/connection)?