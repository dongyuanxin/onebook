"use strict";
const path = require("path");
const mysql = require("mysql");

const config = require(path.join(__dirname, "..", "config.js")).mysql;
const pool = mysql.createPool(config);

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, values, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
        connection.release();
      });
    });
  });
};

exports = module.exports = {
  query
};
