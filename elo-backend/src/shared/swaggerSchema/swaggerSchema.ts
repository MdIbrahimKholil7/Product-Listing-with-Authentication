export const swaggerSchemas = {
  RegisterDTO: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'John Doe',
      },
      email: {
        type: 'string',
        format: 'email',
        example: 'john.doe@example.com',
      },
      address: {
        type: 'string',
        example: '123 Street, City, Country',
      },
      password: {
        type: 'string',
        example: 'password123',
      },
    },
    required: ['name', 'email', 'address', 'password'],
  },
  LoginDTO: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'john.doe@example.com',
      },
      password: {
        type: 'string',
        example: 'password123',
      },
    },
    required: ['email', 'password'],
  },
  TokenResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'success',
      },
      data: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            example: 'edfkgfghjfjdgjbvgbngifhsgjkgg...',
          },
          user: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com',
              },
              address: {
                type: 'string',
                example: '123 Street, City, Country',
              },
            },
          },
        },
      },
    },
  },
  ProductResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },
      message: {
        type: 'string',
        example: 'success',
      },
      data: {
        type: 'array',
        items: {
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
      },
    },
  },
}
