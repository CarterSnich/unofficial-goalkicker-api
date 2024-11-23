import { Router } from "express";
import { getWebpage } from "../utils";

const router = Router();

router.get("/", async function (req, res, _) {
  const urlParam = req.query.url;

  // Validate the URL parameter
  if (!urlParam) {
    res.status(400).send("Missing book page URL.");
  }

  let url: URL;
  try {
    url = new URL(urlParam.toString());
  } catch (err) {
    res.status(400).send("Invalid URL format.");
  }
  const $ = await getWebpage(url);

  try {
    // Fetch and parse the webpage

    // Extract data
    const title = $("#header > h1:nth-child(1)").text().trim();
    const coverUrl = new URL($(".pagePreview2").attr("src"), url);
    const chapters = $(
      "#page > div:nth-child(6) > ol:nth-child(2) > li.chapter-type"
    )
      .map((_, el) => $(el).text().trim())
      .toArray();
    const appendices = $(
      "#page > div:nth-child(6) > ol:nth-child(2) > li.appendix-type"
    )
      .map((_, el) => $(el).text().trim())
      .toArray();
    const pagePreviews = $("#page > div:nth-child(7) > img.pagePreview")
      .map((_, el) => new URL($(el).attr("src"), url).toString())
      .toArray();

    // Send extracted data as JSON
    res.json({
      title: title,
      cover_url: coverUrl.toString(),
      contents: { chapters, appendices },
      page_previews: pagePreviews,
    });
  } catch (err) {
    // Handle errors during scraping
    console.error(err);
    res.status(500).send(`Failed to scrape ${url.href}.`);
  }
});

export default router;
