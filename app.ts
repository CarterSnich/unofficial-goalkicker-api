import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import * as path from "path";

import bookEntry from "./routes/book-entries";
import bookPage from "./routes/book-page";

const app = express();
const port = 3000;

app.use(logger(process.env.NODE_ENV || "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.redirect("https://cartersnich.github.io/unofficial-goalkicker-api/");
});
app.use("/book-entries", bookEntry);
app.use("/book-page", bookPage);

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

export default app;
