const logEvents = require("./logger");

const EventEmitter = require("events");

class Emitter extends EventEmitter {}

const my_emitter = new Emitter();

my_emitter.on("log", (msg) => logEvents(msg));

setTimeout(() => my_emitter.emit("log", "An entry has been recorded"), 400);
