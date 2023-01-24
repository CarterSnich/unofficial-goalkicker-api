const express = require('express');
const router = express.Router();
const axios = require("axios")
const cheerio = require("cheerio")

// get webpage 
async function getWebpage(url) {
  const response = await axios.get(url);
  const webpage = cheerio.load(response.data)
  return webpage;
}

/* API */
router.get('/get-books', async function (req, res, next) {
  let books = []
  const url = 'https://books.goalkicker.com/';

  const $ = await getWebpage(url)
  const bookElements = $('.books > .bookContainer')

  for (let i = 0; i < bookElements.length; i++) {
    const ch = cheerio.load(bookElements[i])

    const title = ch.text()
    const pageLink = `${url}${ch.root().find('a').attr('href')}`

    const bookPage = await getWebpage(pageLink)
    const partialLink = bookPage.root().find('#frontpage>a').attr('href')
    const link = `${pageLink}${partialLink}`

    books.push({
      title: title,
      pageLink: pageLink,
      link: link,
    });
  }

  res.json({
    books: books
  })

});

module.exports = router;
