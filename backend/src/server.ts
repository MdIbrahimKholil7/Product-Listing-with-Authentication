import dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import userRoute from './routes/userRoute'
import errorMiddleware from './utils/errorMiddlware'
import container from './config/inversify.config'
import AuthRoutes from './routes/userRoute'
import TYPES from './utils/appConsts'
import ProductRoutes from './routes/productRoute'
import notFoundMiddleware from './middlware/notFoundMiddlware'
import setupSwagger from './config/swagger.config'
import cors from 'cors'
export class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
    setupSwagger(this.app)
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev')) // for logging http requests
    this.app.use(cors())
  }

  private routes(): void {
    const authRoutes = container.get<AuthRoutes>(TYPES.AuthRoutes)
    const productRoutes = container.get<ProductRoutes>(TYPES.ProductRoutes)

    this.app.use('/api/auth', authRoutes.router)
    this.app.use('/api/product', productRoutes.router)

    // 404 Middleware
    // this.app.use(notFoundMiddleware)
    // Error-handling middleware
    this.app.use(errorMiddleware)
  }
}

const app = new App().app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default App
