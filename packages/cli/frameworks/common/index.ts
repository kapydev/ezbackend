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