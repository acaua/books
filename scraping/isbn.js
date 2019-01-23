const axios = require("axios");
const cheerio = require("cheerio");

const scrapISBN = async url => {
  if (url.includes("packtpub.com")) {
    return await scrapPacktpub(url);
  } else if (url.includes("amazon.com")) {
    return await scrapAmazon(url);
  } else if (url.includes("manning.com")) {
    return await scrapManning(url);
  } else if (url.includes("fundamental-kotlin.com")) {
    return await scrapFundamentalKotlin(url);
  }

  return "unavailable";
};

const scrapPacktpub = async url => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) return "unavailable";

    const html = response.data;
    const $ = cheerio.load(html);

    return $("span[itemprop = 'isbn']")
      .first()
      .text();
  } catch (e) {
    console.log(e);
    return "unavailable";
  }
};

const scrapAmazon = async url => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) return "unavailable";

    const html = response.data;
    const $ = cheerio.load(html);

    return $("b:contains('ISBN-13:')")
      .parent()
      .contents()
      .eq(1)
      .text()
      .trim()
      .replace("-", "");
  } catch (e) {
    console.log(e);
    return "unavailable";
  }
};

const scrapManning = async url => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) return "unavailable";

    const html = response.data;
    const $ = cheerio.load(html);

    return $("li:contains('ISBN')")
      .first()
      .text()
      .replace("ISBN", "")
      .trim();
  } catch (e) {
    console.log(e);
    return "unavailable";
  }
};

const scrapFundamentalKotlin = async url => {
  try {
    const response = await axios.get(url);

    if (response.status !== 200) return "unavailable";

    const html = response.data;
    const $ = cheerio.load(html);

    return $("meta[scheme = 'ISBN']").attr("content");
  } catch (e) {
    console.log(e);
    return "unavailable";
  }
};

module.exports = scrapISBN;
