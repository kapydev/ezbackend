import { EzModel, EzRouter } from "@ezbackend/common";
import { DataTypes } from "sequelize";
import _ from "lodash";

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
  array: {
    type: DataTypes.ARRAY(DataTypes.TEXT)
  },
  uuid: {
    type: DataTypes.UUID
  },
  json: {
    type: DataTypes.JSON
  }
});

export const user = new EzModel("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const program = new EzModel("program", {});

program.hasOne(user);

// export const customEndpoint = new EzRouter("custom")

// customEndpoint.registerRoute({
//   method: 'GET',
//   url: '/',
//   schema: {
//     body: {

//     },
//     response: {
//       200: {}
//     }
//   },
//   handler(req,res) {
//     res.send('hi')
//   }
// })

  
// export const customEndpoint = new EzRouter("custom")

// customEndpoint.registerRoute({
//   method: 'GET',
//   url: '/',
//   schema: {
//     body: {

//     },
//     response: {
//       200: {}
//     }
//   },
//   handler(req,res) {
//     res.send('hi')
//   }
// })