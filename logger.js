const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const log_events = async (message) => {
  const date_time = `${format(new Date(), "yyyy-MM-dd")}`;
  const log_item = `${date_time}\t${uuid()}\t${message}\n`;
  console.log(log_item);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventlogs.txt"),
      log_item
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = log_events;
