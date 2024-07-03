import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import userRoute from './src/routes/userRoute'
import errorMiddleware from './src/utils/errorMiddlware'
import dotenv from 'dotenv'
import container from './src/config/inversify.config'
import AuthRoutes from './src/routes/userRoute'
import TYPES from './src/utils/appConsts'
import ProductRoutes from './src/routes/productRoute'
import notFoundMiddleware from './src/middlware/notFoundMiddlware'
dotenv.config()
class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev')) // for logging http requests
  }

  private routes(): void {
    const authRoutes = container.get<AuthRoutes>(TYPES.AuthRoutes)
    const productRoutes = container.get<ProductRoutes>(TYPES.ProductRoutes)

    this.app.use('/api/auth', authRoutes.router)
    this.app.use('/api/product', productRoutes.router)

    // 404 Middleware
    this.app.use(notFoundMiddleware)
    // Error-handling middleware
    this.app.use(errorMiddleware)
  }
}

const app = new App().app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
