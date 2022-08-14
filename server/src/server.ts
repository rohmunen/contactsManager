import express from 'express'
import cors from 'cors'
import router from './router'
import { connectDB } from './database/client'
import { migrateUp } from './database/migrations/migrate-up'
import { errorMiddleware } from './middlewares/error-middleware'

export default class Server {
  private server: express.Application;
  private port: number;

  constructor() {
    this.server = express()
    this.port = Number(process.env.PORT) || 8080
  }

  static create() {
    const server = new Server
    server.initDb()
    server.initMiddlewares()
    server.initRouter()
    server.initErrorHandling()
    return server
  }

  initMiddlewares() {
    this.server.use(express.json())
    this.server.use(cors())
  }

  initErrorHandling() {
    this.server.use(errorMiddleware)
  }

  initRouter() {
    this.server.use('/api', router)
  }

  async initDb() {
    await migrateUp()
    connectDB()
  }

  async listen() {
    this.server.listen(this.port, () => {
      console.log('server is running on localhost:' + this.port)
    })
  }
}