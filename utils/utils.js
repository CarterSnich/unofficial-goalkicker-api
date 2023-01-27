// get webpage
async function getWebpage(url) {
	const cheerio = require("cheerio");
	const axios = require("axios");

	const response = await axios.get(url);
	const webpage = cheerio.load(response.data);

	return webpage;
}

module.exports = getWebpage;
