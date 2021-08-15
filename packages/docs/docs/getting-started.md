---
sidebar_label: 'Getting Started'
sidebar_position: 2
---

# Getting Started

A default schema is generated for you. You can edit this schema or create your own. 
Running this will automatically create POST, GET, PUT, and DELETE endpoints that you can test on [localhost:8888/docs](http://localhost:8888/docs/static/index.html)

```ts title=".ezb/index.ts"
import { EzModel, EzRouter } from "@ezbackend/common";
import { DataTypes } from "sequelize";

export const user = new EzModel("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER
  }
});

export const framework = new EzModel("framework", {
  name: {
    type: DataTypes.STRING
  }
});

user.hasOne(framework);
```

You can also make your own [custom endpoints](tutorial-basics/create-a-route)

