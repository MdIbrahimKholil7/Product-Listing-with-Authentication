import express from 'express'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.routes()
  }

  private routes(): void {}
}

const app = new App().app
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
