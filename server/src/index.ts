import 'dotenv/config'
import Server from "./server"

const start = async () => {
  const server = Server.create()
  server.listen()
}

start()