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

To create a new schema, add the following to `.ezb/index.ts`

```ts title=".ezb/index.ts"
import {EzModel} from "@ezbackend/common"
import {DataTypes} from 'sequelize'

export const mySchema = new EzModel("mySchema", {
  string: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});
```

### Breaking it down

```ts
export const mySchema;
```

EzBackend looks for exported models from the `index.ts` file to create the database and generate APIs, so you **must** export any schemas created

```ts
import {EzModel} from "@ezbackend/common"

new EzModel("mySchema",{...})
```

This creates a sequelize model with the name "mySchema". Under the hood we are calling

[`sequelize.define(modelName, attributes)`](https://sequelize.org/master/manual/model-basics.html)

This creates a table in the DB with the name `MySchema`

:::tip Tip
You can access the sequelize model directly from `mySchema.model`
:::

:::warning Warning
Sequelize __auto-pluralises__ and __capitalises__ table names. Eg. `new EzModel('detail')` will be called `Details` in the database
:::

```ts
import {DataTypes} from 'sequelize'

{
  string: {
    type: DataTypes.STRING,
    allowNull:false
  },
  age: {
    type: DataTypes.INTEGER
  }
}
```

For each property in the schema, you must specify the type. These DataTypes must be imported directly from sequelize, and you can view all the supported types [here](../tutorial-extras/supported-datatypes)

## Accessing your database

Once you run

```
npm run ezb

or

yarn ezb
```

Your backend will start, as well as a window with a complete reference of how exactly to connect to your backend and manipulate your database, generated automatically with [fastify-swagger](https://github.com/fastify/fastify-swagger)

<!-- TODO: Insert image of swagger CRUD -->