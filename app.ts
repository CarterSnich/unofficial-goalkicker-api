import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";

import bookEntry from "~/routes/book-entries";
import bookPage from "~/routes/book-page";

const app = express();
const port = 3000;

app.use(logger(process.env.NODE_ENV || "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.send("Hello World!");
});
app.use("/book-entries", bookEntry);
app.use("/book-page", bookPage);

app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});