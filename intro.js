const os = require("os");
const path = require("path");

console.log(os.type());
console.log(os.listdir);
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.parse(__filename));
