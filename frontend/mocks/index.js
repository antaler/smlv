const { prefix, endpoints } = require('../webs/login/mocks.js')

const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
await fastify.register(cors, {
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization']
})

endpoints.forEach(({ method, endpoint, handler }) => {
  fastify[method](`${prefix}${endpoint}`, handler)
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
