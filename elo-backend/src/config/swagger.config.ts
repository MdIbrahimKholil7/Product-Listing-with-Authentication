import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Application } from 'express'
import dotenv from 'dotenv'
import { swaggerSchemas } from '../shared/swaggerSchema/productSchema'

dotenv.config()

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Product Listing Application API',
    version: '1.0.0',
    description: 'API documentation for the Product Listing Application',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: swaggerSchemas,
  },
}

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/dto/*.ts'], // Paths to files containing OpenAPI definitions
}

const swaggerSpec = swaggerJSDoc(options)

const setupSwagger = (app: Application): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

export default setupSwagger
