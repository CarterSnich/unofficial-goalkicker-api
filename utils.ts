import axios from "axios";
import { load } from "cheerio";

export async function getWebpage(url: URL) {
  const response = await axios.get(url.href);
  const webpage = load(response.data);
  return webpage;
}
