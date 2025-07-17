function extractJsonString (text) {
  // Remove ```json or ``` prefixes and suffixes
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()
}

module.exports = {
  extractJsonString
}
