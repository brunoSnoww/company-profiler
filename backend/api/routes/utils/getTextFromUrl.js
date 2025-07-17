const axios = require('axios');
const cheerio = require('cheerio');

async function getTextFromUrl(pageUrl, maxLength = 4000) {
  let url = pageUrl;
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const $ = cheerio.load(data);
    $('script, style, nav, footer, header, noscript, svg, aside').remove();

    const rawText = $('body').text().replace(/\s\s+/g, ' ').trim();
    const textContent = rawText.slice(0, maxLength);

    if (!textContent || textContent.length < 50) {
      throw new Error('Extracted content too short or missing.');
    }

    return textContent;
  } catch (error) {
    console.error(`Error fetching or processing URL "${url}": ${error.message}`);
    throw new Error(`Failed to extract content from: ${url}`);
  }
}

module.exports = {
  getTextFromUrl
};
