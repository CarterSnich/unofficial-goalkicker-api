# unofficial-goalkicker-api

An unofficial API for fetching and dowloading books from [GoalKicker](https://books.goalkicker.com/) using web scraping with [Cheerio](https://cheerio.js.org/).

## How to Use

### [`/book-entries`](https://unofficial-goalkicker-api-pyal.vercel.app/book-entries)

Returns a JSON array of all books listed on the homepage. Each object in the array includes the following keys:

#### Response

- **`title`**: The title of the book.
- **`cover_url`**: The URL of the book's cover image.
- **`page_url`**: The URL to the book's detailed page.

---

### [`/book-page`](https://unofficial-goalkicker-api-pyal.vercel.app/book-page)

Returns all extracted data from the webpage associated with the given book URL.

#### Parameters

- **`url`** _(GET)_: The URL of the book's webpage.

#### Response

Returns an object with the following structure:

- **`title`**: The title of the book.
- **`cover_url`**: The URL of the book's cover image.
- **`contents`**: An object containing:
  - **`chapters`**: List of chapters.
  - **`appendices`**: List of appendices.
- **`page_previews`**: Additional previews of the book's pages.

## GoalKicker.com

Thanks to GoalKicker team for creating these wonderful programming books!

<a style="padding: 7px 10px 7px 10px !important;line-height: 35px !important;height: 51px !important;min-width: 217px !important;text-decoration: none !important;display: inline-flex !important;color: #ffffff !important;background-color: #3498db !important;border-radius: 5px !important;border: 1px solid transparent !important;padding: 7px 10px 7px 10px !important;font-size: 20px !important;letter-spacing: 0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family: 'Arial', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;" target="_blank" href="https://www.buymeacoffee.com/GoalKickerBooks">
    <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee">
    <span style="margin-left:15px;font-size:32px !important;font-weight:bold;">Order them a coffee!</span>
</a>
