const fs = require("fs");

const fsPromises = require("fs").promises;
// fs.readFile("file.txt", function (err, data) {
//   if (err) throw err;
//   console.log(data.toString());
// });

const path = require("path");
const file_ops = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "filesys.js"),
      "utf8"
    );
    const data2 = await fsPromises.readFile(path.join(__dirname, "file.txt"));
    // Read two file
    // Combine the data now
    await fsPromises.writeFile(path.join(__dirname, "out2.txt"), data);
    await fsPromises.rename(
      path.join(__dirname, "out2.txt"),
      path.join(__dirname, "alex.txt")
    );
  } catch (err) {
    console.log(err);
  }
};
file_ops();
fs.readFile(path.join(__dirname, "file.txt"), function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

// In case you need to do multiple operations on a file, the async nature of these functions may cause semantic problems. To avoid that use async/await logic like in coreJS.
fs.writeFile(path.join(__dirname, "out.txt"), "Nice to meet", function (err) {
  if (err) throw err;
  console.log("Operatin finished");
});

process.on("uncaughtException", function (err) {
  console.error("There was an uncaught error in the code");
  console.log(err);
  process.exit(1);
});
