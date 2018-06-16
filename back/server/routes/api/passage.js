"use strict";

const path = require("path");
const { isEmptyStr } = require(path.join(global.path, "vendor", "util.js"));
const Passage = require("./../../services/passage");
let passageApi = new Passage();

// 抓取最近更新的文章
const fetch = async (ctx, next) => {
  let { page, step, needSummary } = ctx.request.body,
    results = [];

  if (page === undefined || step === undefined) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter is empty"
    };
    return;
  }
  results = await passageApi.fetch(page, step, needSummary);
  ctx.response.body = {
    code: 0,
    results
  };
  return;
};

// 创建最新的文章
const create = async (ctx, next) => {
  let { title, summary, content, category, operationPwd } = ctx.request.body,
    success = false;
  if (
    isEmptyStr(title) ||
    isEmptyStr(content) ||
    isEmptyStr(summary) ||
    isEmptyStr(operationPwd)
  ) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter is empty"
    };
    return;
  }
  if (operationPwd !== global.operationPwd) {
    ctx.response.body = {
      code: -1,
      msg: "Operation pwd is wrong"
    };
    ctx.status = 401;
    return;
  }
  category = isEmptyStr(category) ? "未分类" : category.trim();
  success = await passageApi.create(title, summary, content, category);
  if (success) {
    ctx.response.body = {
      code: 0,
      msg: "Create passage success"
    };
  } else {
    ctx.response.body = {
      code: -1,
      msg: "Create passage fail"
    };
  }
  return;
};

// 删除文章
const del = async (ctx, next) => {
  let { id, operationPwd } = ctx.request.body,
    success = false;
  if (id === undefined || isEmptyStr(operationPwd)) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter is empty"
    };
    return;
  }
  if (operationPwd !== global.operationPwd) {
    ctx.response.body = {
      code: -1,
      msg: "Operation pwd is wrong"
    };
    ctx.status = 401;
    return;
  }
  success = await passageApi.del(id);
  if (success) {
    ctx.response.body = {
      code: 0,
      msg: "Del passage success"
    };
  } else {
    ctx.response.body = {
      code: -1,
      msg: "Del passage fail"
    };
  }
  return;
};

exports = module.exports = {
  "POST /api/passage/fetch": fetch,
  "POST /api/passage/create": create,
  "POST /api/passage/del": del
};
