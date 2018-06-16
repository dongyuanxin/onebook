"use strict";

const path = require("path");
const { isEmptyStr , generateRandomStr } = require(path.join(global.path, "vendor", "util.js"));
const User = require("./../../services/user");

let userApi = new User();

// 用户登录
const login = async (ctx, next) => {
  let { userId, password } = ctx.request.body

  // 验证密码
  let userInfo = await userApi.verify(userId, password);
  if (userInfo === [] || userInfo.password !== password) {
    ctx.response.body = {
      code: -1,
      msg: "用户名或密码错误"
    };
    return;
  }
  
  let base = generateRandomStr( 32 ) // 前后端同时标记用户登录的32位随机字符串(防止同时登录)
  global.user[ userId ] = { base }

  userInfo.base = base // 交给前端进行保存
  delete userInfo["password"];
  ctx.response.body = {
    code: 0,
    results: userInfo
  };
  return;
};

// 状态检查
const check = async (ctx, next) => {
  let { userId , base } = ctx.request.body 

  if (isEmptyStr( userId ) || isEmptyStr( base )) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter missing"
    };
  }

  if (global.user.hasOwnProperty(userId) === false) {
    // 重启服务器 ：重新登录
    ctx.response.body = {
      code: -1,
      msg: "请登录"
    };
  } else if (global.user[userId].base !== base) {
    // 异地登录：重新登录
    ctx.response.body = {
      code: -1,
      msg: "异地登录,请重新登录"
    };
  } else if (global.user[userId].base === base) {
    // 保持登录，通过验证
    ctx.response.body = {
      code: 0,
      msg: "Keep logging"
    };
  }
};

// 用户登出
const logout = async (ctx, next) => {
  let { userId , base } = ctx.request.body
  if( isEmptyStr( base )|| global.user.hasOwnProperty(userId) === false || base !== global.user[userId].base ) {
    // 防止非法登出用户账号
    ctx.response.body = {
      code : -1 ,
      msg : "Invalid logout request"
    }
    ctx.status = 401
    return 
  }
  delete global.user[userId] // 清空 global.user 中 userId 信息
  ctx.response.body = {
    code: 0,
    msg: "logout success"
  };
  return;
};

// 检查用户是否存在
const exist = async ( ctx , next ) => {
  let { userId } = ctx.request.body 
  if( isEmptyStr( userId ) ) {
    ctx.response.body = {
      code : -1 ,
      msg : "Invalid parameter"
    }
    ctx.status = 401
    return 
  }
  let results = await userApi.exist( userId ) 
  ctx.response.body = {
    code : 0 , 
    results
  }
  return 
}

exports = module.exports = {
  "POST /api/user/login": login,
  "POST /api/user/logout": logout,
  "POST /api/user/check": check ,
  "POST /api/user/exist": exist
};
