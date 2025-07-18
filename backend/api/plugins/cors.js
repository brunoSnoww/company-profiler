"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function corsPlugin(fastify, opts) {
  fastify.register(require("@fastify/cors"), { origin: true });
});
