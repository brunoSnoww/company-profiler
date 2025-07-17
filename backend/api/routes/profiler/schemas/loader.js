"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.addSchema(require("./get-document.json"));
  fastify.addSchema(require("./query.json"));
});
