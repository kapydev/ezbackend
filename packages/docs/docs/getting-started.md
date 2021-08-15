---
sidebar_label: 'Getting Started'
sidebar_position: 2
---

# Getting Started

A default schema is generated for you. You can edit this schema or create your own. 
Running this will automatically create POST, GET, PUT, and DELETE endpoints that you can test on [http://localhost:8888/docs/static/index.html](http://localhost:8888/docs/static/index.html)

```tsx
import { EzModel, EzRouter } from "ezbackend";
import { DataTypes } from "sequelize";

export const user = new EzModel("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
```

You can also make your own custom endpoints

```tsx
export const customEndpoint = new EzRouter("custom")

customEndpoint.registerRoute({
  method: 'GET',
  url: '/',
  schema: {
    body: {
    },
    response: {
      200: {}
    }
  },
  handler(req,res) {
    res.send('hi')
  }
})
```

