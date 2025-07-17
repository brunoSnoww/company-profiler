'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const fastifyLm = await import('fastify-lm')
  fastify.register(fastifyLm, opts.openai)
})
