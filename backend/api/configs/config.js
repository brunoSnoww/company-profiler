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
            name: 'lm',
            provider: 'openai',
            model: 'gpt-4o-mini',
            apiKey: fastify.secrets.OPENAI_API_KEY
          }
        ]
      }
    })
  },
  { name: 'application-config' }
)
