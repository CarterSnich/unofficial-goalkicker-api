const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const getWebpage = require("./../utils/utils");

const books = router.get("/get-books", async function (req, res, next) {
	const books = [];
	const url = new URL("https://books.goalkicker.com/");

	const $ = await getWebpage(url);
	const bookElements = $(".books > .bookContainer");

	for (let i = 0; i < bookElements.length; i++) {
		const bookElement = cheerio.load(bookElements[i]);

		// book title
		const title = bookElement.text();
		// book page link
		const pageLink = new URL(bookElement.root().find("a").attr("href"), url);

		// book cover
		const cover = new URL(bookElement.root().find("a").find("img").attr("src"), url);

		// load book page
		const bookPage = await getWebpage(pageLink);
		const partialLink = bookPage.root().find("#frontpage>a").attr("href");
		// book download link
		const pdfLink = new URL(partialLink, pageLink);

		books.push({
			title: title,
			pageLink: pageLink,
			cover: cover,
			pdfLink: pdfLink,
		});
	}

	res.json({
		books: books,
	});
});

module.exports = books;
