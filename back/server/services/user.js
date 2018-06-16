"use strict";

const path = require("path");

const { query } = require(path.join(global.path, "vendor", "mysql"));

function User() {}

// 验证用户名和密码是否正确
User.prototype.verify = async (userId, password) => {
  let table = "user";
  let sql = `select * from ${table} where user_id = ? and password = ? ;`;
  try {
    let res = await query(sql, [userId, password]);
    if (res.hasOwnProperty("length") && res.length === 0) {
      return [];
    } else {
      return {
        user_id: res[0].user_id,
        password: res[0].password,
        role: res[0].role
      };
    }
  } catch (error) {
    console.log("Error at User.verify" , error.message);
    return false;
  }
};

// 检查用户是否存在
User.prototype.exist = async userId => {
  let table = 'user'
  let sql = `select * from ${table} where user_id = ? ;`;
  try {
    let res = await query( sql , [userId] ) 
    return res.hasOwnProperty("length") && res.length > 0 ? true : false
  } catch (error) {
    console.log("Error at User.exist" , error.message);
    return false;
  }
}

exports = module.exports = User;
