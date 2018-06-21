"use strict";

const fs = require("fs");
const path = require("path");
const { sha256 } = require("./vendor/util");

const port = 80;

const mysql = {
  host: "172.31.73.150",
  port: 3306,
  user: "dongyuanxin",
  password: "dongyuanxin",
  database: "onebook"
};

const _global = {
  user: {},
  views: {
    index: fs.readFileSync(
      path.join(__dirname, "server", "public", "index.html"),
      "utf-8"
    ),
    "404": fs.readFileSync(
      path.join(__dirname, "server", "views", "404.html"),
      "utf-8"
    )
  },
  path: path.join(__dirname)
};

exports = module.exports = {
  port,
  mysql,
  _global
};
