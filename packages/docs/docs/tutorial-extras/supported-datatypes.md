---
sidebar_position: 1
---

# Supported DataTypes

The supported DataTypes are

1. `DataTypes.STRING`
1. `DataTypes.INTEGER`
1. `DataTypes.FLOAT`
1. `DataTypes.DOUBLE`
1. `DataTypes.REAL`
1. `DataTypes.ENUM`
1. `DataTypes.DATE`
1. `DataTypes.UUID`
1. `DataTypes.JSON`

## Demo Usage

```ts
import { DataTypes } from "sequelize";

export const sample = new EzModel("sample", {
  string: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  int: {
    type: DataTypes.INTEGER,
  },
  float: {
    type: DataTypes.FLOAT,
  },
  double: {
    type: DataTypes.DOUBLE
  },
  real: {
    type: DataTypes.REAL
  },
  enum: {
    type: DataTypes.ENUM,
    values: ['one','two','three']
  },
  data: {
    type: DataTypes.DATE
  },
  uuid: {
    type: DataTypes.UUID
  },
  json: {
    type: DataTypes.JSON
  }
});
```
