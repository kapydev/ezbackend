---
sidebar_position: 1
---

# Create an EzModel

Schemas represent how data gets put into the database (DB)

You can imagine this by comparing it to excel,

- The **DB** is an **excel file** where the data is stored
- The **Table** refers to a single **excel sheet** where the data is stored. A single **schema** makes a table
- The **column names** which specify what goes into the excel sheet are the **schema properties**

## Create your first EzModel

For example, if we want a user, add the following to `.ezb/index.ts`

```ts title=".ezb/index.ts"
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { EzModel } from "@ezbackend/common";

@EzModel()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number
}
```

### Breaking it down

```ts
@EzModel()
export class User
```
You can make any class into an EzModel by putting the [decorator](https://fireship.io/lessons/ts-decorators-by-example/) `@EzModel()` above the class definition.
:::warning
You **must** export any models created
:::

Under the hood we are creating a creating a typeorm [Entity](https://typeorm.io/#/entities), so you can define everything within the Entity as if it were a Typeorm entity and expect it to work


```ts
import { PrimaryGeneratedColumn, Column } from 'typeorm';

{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  age: number
}
```

Over here we are adding to the table according to the [typeorm specification](https://typeorm.io/#/undefined/adding-table-columns)

:::info
EzBackend automatically generates default CRUD routes for each of your defined models
:::

## Accessing your database

Once you run

```
npm run ezb

or

yarn ezb
```

Your backend will start, as well as a window with a complete reference of how exactly to connect to your backend and manipulate your database, generated automatically with [fastify-swagger](https://github.com/fastify/fastify-swagger)

<!-- TODO: Insert image of swagger CRUD -->