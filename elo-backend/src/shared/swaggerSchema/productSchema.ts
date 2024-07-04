export const swaggerSchemas = {
  Product: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        example: 1,
      },
      name: {
        type: 'string',
        example: 'Product Name',
      },
      description: {
        type: 'string',
        example: 'Product Description',
      },
      price: {
        type: 'number',
        example: 19.99,
      },
    },
  },
}
