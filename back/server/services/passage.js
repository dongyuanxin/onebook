"use strict";

const path = require("path");
const moment = require("moment");

const { query } = require(path.join(global.path, "vendor", "mysql"));

function Passage() {}

// 抓取最近更新的文章
Passage.prototype.fetch = async (page, step, needSummary) => {
  let table = "passage",
    offset = (page - 1) * step;
  let sql = `select * from ${table} order by create_time desc limit ${offset} , ${step} ; `;
  try {
    let rows = await query(sql);
    return rows.map(row => {
      let item = {
        id: row.Id,
        title: row.title,
        loc: JSON.parse(row.loc),
        createTime: moment(row.create_time).format("YYYY-MM-DD HH:mm:ss"),
        updateTime: moment(row.update_time).format("YYYY-MM-DD HH:mm:ss")
      };
      return item;
    });
  } catch (error) {
    console.log("Error at Passage.fetch", error.message);
    return [];
  }
};

// 收藏文章
Passage.prototype.collect = async (title, loc, userId) => {
  let table = "passage";
  let sql = `insert into ${table} set ? ;`;
  try {
    let res = await query(sql, {
      title,
      loc: JSON.stringify(loc),
      user_id: userId
    });
    if (res.affectedRows === 0) {
      return {
        success: false
      };
    } else {
      return {
        success: true,
        insertId: res.insertId
      };
    }
  } catch (error) {
    console.log("Error at Passage.create", error.message);
    return false;
  }
};

// 删除文章
Passage.prototype.del = async id => {
  let table = "passage";
  let sql = `delete from ${table} where Id = ? ;`;
  try {
    let res = await query(sql, [id]);
    return res.affectedRows > 0 ? true : false;
  } catch (error) {
    console.log("Error at Passage.del", error.message);
    return false;
  }
};

Passage.prototype.check = async (userId, loc) => {
  let table = "passage";
  let sql = `select * from ${table} where user_id = ? and loc = ?;`;
  try {
    let res = await query(sql, [userId, loc]);
    if (res.length > 0) {
      return {
        success: true,
        row: res[0]
      };
    } else {
      return {
        success: false
      };
    }
  } catch (error) {
    console.log("Error at Passage.check", error.message);
    return false;
  }
};

exports = module.exports = Passage;
