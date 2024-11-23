import { load } from "cheerio";
import { Router } from "express";
import { getWebpage } from "../utils";

const router = Router();

router.get("/", async function (_, res) {
  const url = new URL("https://books.goalkicker.com/");
  try {
    const $ = await getWebpage(url);

    // Select book nodes
    const bookNodes = $(".books > .bookContainer");

    // Extract book details
    const bookEntries = bookNodes
      .map((_, el) => {
        const doc = load(el);
        const anchor = doc.root().find("a");
        const img = anchor.find("img");

        // Extract and validate data
        const title = doc.text().trim() || "Untitled";
        const coverUrl = img.attr("src")
          ? new URL(img.attr("src"), url).toString()
          : null;
        const pageUrl = anchor.attr("href")
          ? new URL(anchor.attr("href"), url).toString()
          : null;

        // Return structured book entry
        return {
          title: title,
          cover_url: coverUrl,
          page_url: pageUrl,
        };
      })
      .toArray();

    // Respond with book entries
    res.json(bookEntries);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to scrape ${url.href}`);
  }
});

export default router;
