const express = require("express");
const app = express();
const logEvents = require("./middleware/logger");
const path = require("path");
const PORT = process.env.PORT || 3000;

//
app.use((req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url} `, "thelog.txt");
  console.log(`${req.method} ${req.path} `);
  next();
});
//built-in middlewares in express js
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
// Configuring successfull routing mechanism including regex patterns
app.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("Finished");
};
app.get("/chain(.html)?", [one, two, three]);
app.get("/*", (req, res) => {
  console.log(req.url);
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log("Server is running on port " + PORT));
