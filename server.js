const express = require("express");
const logger = require("morgan");
const debug = require("debug")("mern:server");

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
