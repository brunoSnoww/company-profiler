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
      const { lm } = fastify
      const { url } = request.query

      try {
        const textContent = await getTextFromUrl(url)

        const coreProfileResponse = await lm.chat({
          messages: [{ role: 'user', content: PROMPT_1_EXTRACTION.replace('{scraped_text}', textContent) }],
          response_format: { type: 'json_object' }
        })

        const coreProfileSanitize = extractJsonString(coreProfileResponse)
        const coreProfile = JSON.parse(coreProfileSanitize)

        const keywordsResponse = await lm.chat({
          messages: [{
            role: 'user',
            content: PROMPT_2_KEYWORDS.replace('{core_profile_json}', JSON.stringify(coreProfile))
          }],
          response_format: { type: 'json_object' }
        })

        const keywordSanitize = extractJsonString(keywordsResponse)
        const keywords = JSON.parse(keywordSanitize)

        return {
          ...coreProfile,
          ...keywords
        }
      } catch (error) {
        request.log.error(
          {
            url,
            message: error.message,
            stack: error.stack,
            responseData: error.response?.data
          },
            `Failed to generate profile for URL: ${url}`
        )
        // Use the error status code if available, otherwise fallback to 500
        // best practices say we should only return 4** and 500, to not give enough information about the server
        // but let's keep simple
        const statusCode = error.response?.status || 500
        return reply.code(statusCode).send({ error: 'An internal error occurred while generating the profile.' })
      }
    }
  })
}
