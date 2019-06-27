require('dotenv').config() // load dot env

const fastify = require('fastify')({
  logger: true
})

const { Client } = require('pg')

// connect to database pgsql
const dbInfo = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'postgres'
}

const client = new Client(
  `postgres://${dbInfo.user}:${dbInfo.password}@${dbInfo.host}:${dbInfo.port}/${dbInfo.database}`
)
client.connect()

fastify.listen(process.env.APP_PORT || 3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})