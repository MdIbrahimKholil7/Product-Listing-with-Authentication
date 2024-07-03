import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import userRoute from './src/routes/userRoute'
import errorMiddleware from './src/utils/errorMiddlware'
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
    this.app.use('/auth', userRoute)
    this.app.use(errorMiddleware) // Error-handling middleware
  }
}

const app = new App().app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
