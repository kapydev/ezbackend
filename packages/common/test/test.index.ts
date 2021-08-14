import { EzModel } from "@ezbackend/common";
import { DataTypes } from "sequelize";

//TODO: Make arrays work
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
    date: {
      type: DataTypes.DATE
    },
    uuid: {
      type: DataTypes.UUID
    },
    json: {
      type: DataTypes.JSON
    }
  });

export const program = new EzModel("program", {
  name: {
    type:DataTypes.STRING,
    allowNull: false
  }
})

export const user = new EzModel("user",{
  name: {
    type:DataTypes.STRING,
    allowNull:false
  }
})

export const detail = new EzModel("detail", {
  age: {
    type: DataTypes.INTEGER
  }
})

//TODO: Test cyclic graph

program.hasMany(user)
user.hasOne(detail)