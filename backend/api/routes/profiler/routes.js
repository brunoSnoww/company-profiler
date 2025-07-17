const { getTextFromUrl } = require('../utils/getTextFromUrl')
const { PROMPT_1_EXTRACTION, PROMPT_2_KEYWORDS } = require('../utils/prompts')
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

        // Step 1: Get the core profile (returns a JSON string)
        const coreProfileResponse = await lm.chat({
          messages: [{ role: 'user', content: PROMPT_1_EXTRACTION.replace('{scraped_text}', textContent) }],
          response_format: { type: 'json_object' }
        })

        const coreProfileSanitize = extractJsonString(coreProfileResponse)
        const coreProfile = JSON.parse(coreProfileSanitize)

        // Step 2: Get the keywords using the parsed core profile
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
        request.log.error(error, `Failed to generate profile for URL: ${url}`)
        return reply.code(500).send({ error: 'An internal error occurred while generating the profile.' })
      }
    }
  })
}
