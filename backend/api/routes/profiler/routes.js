const { getTextFromUrl } = require('../utils/getTextFromUrl')
const { PROMPT_1_EXTRACTION, PROMPT_2_KEYWORDS } = require('./prompts/prompts')
const { extractJsonString } = require('../utils/extractJsonString')

module.exports = async function profilerRoutes (fastify, _opts) {

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: fastify.getSchema('schema:query'),
      response: { 200: fastify.getSchema('schema:document') }
    },
    handler: async function getProfile (request, reply) {
      const { url, model } = request.query
      const lm = fastify[model]

      request.log.info({ url, model }, `Received request to generate profile for URL: ${url}`)

      try {
        const textContent = await getTextFromUrl(url)
        request.log.info({ url, textLength: textContent.length }, 'Successfully scraped text content')

        const coreProfileResponse = await lm.chat({
          messages: [{ role: 'user', content: PROMPT_1_EXTRACTION.replace('{scraped_text}', textContent) }],
          response_format: { type: 'json_object' }
        })
        request.log.info({ url, model, usage: coreProfileResponse.usage }, 'LLM generated core profile')

        const coreProfileSanitize = extractJsonString(coreProfileResponse)
        const coreProfile = JSON.parse(coreProfileSanitize)

        const keywordsResponse = await lm.chat({
          messages: [{
            role: 'user',
            content: PROMPT_2_KEYWORDS.replace('{core_profile_json}', JSON.stringify(coreProfile))
          }],
          response_format: { type: 'json_object' }
        })

        request.log.info({ url, model, usage: keywordsResponse.usage }, 'LLM generated keywords')

        const keywordSanitize = extractJsonString(keywordsResponse)
        const keywords = JSON.parse(keywordSanitize)

        request.log.info({ url, model }, 'Successfully generated and parsed all data')

        return {
          ...coreProfile,
          ...keywords
        }
      } catch (error) {
        request.log.error(
          {
            url,
            model,
            message: error.message,
            stack: error.stack,
            responseData: error.response?.data
          },
            `Failed to generate profile for URL: ${url}`
        )

        const statusCode = error.response?.status || 500
        return reply.code(statusCode).send({ error: 'An internal error occurred while generating the profile.' })
      }
    }
  })
}
