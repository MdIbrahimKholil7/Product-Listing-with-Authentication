import bodyParser from 'body-parser'
import express from 'express'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(bodyParser.json())
  }

  private routes(): void {
    this.app.use('/auth', () => {})
  }
}

const app = new App().app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
