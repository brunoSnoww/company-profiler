const axios = require('axios');
const cheerio = require('cheerio');

async function getTextFromUrl(pageUrl, maxLength = 4000) {
  let url = pageUrl;
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        Connection: 'keep-alive'
      },
      timeout: 10000
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
    console.error(`Error fetching or processing URL "${url}":`, {
      message: error.message,
      code: error.code,
      responseStatus: error.response?.status,
      responseHeaders: error.response?.headers,
      // To avoid logging huge data, avoid logging body
    });
    throw new Error(`Failed to extract content from: ${url}`);
  }
}

module.exports = {
  getTextFromUrl
};
