//TODO: Enforce type checking within this file

export const badRequest = {
  //TODO: Figure out how to make this 400 in swagger
  statusCode: { type: "number" },
  error: { type: "string" },
  message: { type: "string" },
};

export const singleID = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
};

//TODO: Update this appropriately
export const notFound = badRequest

export const notFoundMsg = {
    statusCode: 404,
    error: "Not found",
    message: "Could not find the Resource with the requested ID"
}