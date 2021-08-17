import { EntityMetadata } from "typeorm";

export const convert = (metadata: EntityMetadata) => {
    //LEFT OFF
  // const columns = metadata.options.columns || {};
  // return Object.entries(columns).reduce(
  //   (jsonSchema, [key, value]) => {
  //     return {
  //       type: jsonSchema.type,
  //       properties: {
  //         ...jsonSchema.properties,
  //         [key]: {
  //           //@ts-ignore
  //           ...value,
  //           //@ts-ignore
  //           type: value.type.name.toLocaleLowerCase(),
  //         },
  //       },
  //     };
  //   },
  //   {
  //     type: "object",
  //     properties: {},
  //   }
  // );
};
