const fp = require('fastify-plugin')
const fastifyEnv = require('@fastify/env')

module.exports = fp(
  async function configLoader (fastify, _) {
    await fastify.register(fastifyEnv, {
      confKey: 'secrets',
      schema: fastify.getSchema('schema:dotenv')
    })
    fastify.decorate('config', {
      openai: {
        models: [
          {
            name: 'google',
            provider: 'google',
            model: 'gemini-2.0-flash-lite',
            apiKey: fastify.secrets.GOOGLE_API_KEY
          }
        ]
      }
    })
  },
  { name: 'application-config' }
)
