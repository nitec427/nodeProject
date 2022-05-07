const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const logEvents = require("./logger");
const PORT = process.env.PORT || 3500;
console.log(PORT);
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

const serveFile = async (file_path, content_type, response) => {
  try {
    const rawData = await fsPromises.readFile(
      file_path,
      !content_type.includes("image") ? "utf8" : ""
    );
    const data =
      content_type === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(200, { "Content-Type": content_type });
    response.end(
      content_type === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  const extension = path.extname(req.url);

  let content_type;

  switch (extension) {
    case ".css":
      content_type = "text/css";
      break;
    case ".js":
      content_type = "text/javasript";
      break;
    case ".json":
      content_type = "application/json";
      break;
    case ".jpg":
      content_type = "image/jpeg";
      break;
    case ".png":
      content_type = "image/png";
      break;
    case ".txt":
      content_type = "text/plain";
      break;
    default:
      content_type = "text/html";
  }

  let file_path;
  if (content_type !== "text/html") file_path = path.join(__dirname, req.url);
  else if (content_type === "text/html" && req.url === "/")
    file_path = path.join(__dirname, "views", "index.html");
  else if (content_type === "text/html" && req.url.slice(-1) === "/")
    file_path = path.join(__dirname, "views", req.url, "index.html");
  else file_path = path.join(__dirname, "views", req.url);
  //   Makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") file_path += ".html";

  const file_exists = fs.existsSync(file_path);

  if (file_exists) {
    serveFile(file_path, content_type, res);
  } else {
    // serve the file
    //   404
    /* 301 redirect */
    switch (path.parse(file_path).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        break;
    }
  }
});
server.listen(PORT, () => console.log(`Server running on PORT ${PORT} `));
