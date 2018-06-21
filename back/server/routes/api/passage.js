"use strict";

const path = require("path");
const { isEmptyStr } = require(path.join(global.path, "vendor", "util.js"));
const Passage = require("./../../services/passage");
let passageApi = new Passage();

// 抓取最近更新的文章
const fetch = async (ctx, next) => {
  let { page, step, userId } = ctx.request.body,
    results = [];

  if (page === undefined || step === undefined || isEmptyStr(userId)) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter is empty"
    };
    return;
  }
  results = await passageApi.fetch(page, step, userId);
  ctx.response.body = {
    code: 0,
    results
  };
  return;
};

// 收藏文章
const collect = async (ctx, next) => {
  let { title, loc, userId } = ctx.request.body,
    results = null;
  if (isEmptyStr(title) || isEmptyStr(userId)) {
    ctx.response.body = {
      code: -1,
      msg: "Parameter is empty"
    };
    return;
  }
  results = await passageApi.collect(title, loc, userId);
  if (results.success) {
    ctx.response.body = { code: 0, msg: "Collect passage success", results };
  } else {
    ctx.response.body = { code: -1, msg: "Collect passage fail" };
  }
  return;
};

// 删除文章
const del = async (ctx, next) => {
  let { id } = ctx.request.body,
    success = false;
  if (id === undefined) {
    ctx.response.body = { code: -1, msg: "Parameter is empty" };
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

const check = async (ctx, next) => {
  let { loc, userId } = ctx.request.body,
    results = false;
  if (loc === null || loc === undefined || isEmptyStr(userId)) {
    ctx.response.body = { code: -1, msg: "Parameter is empty" };
    return;
  }
  results = await passageApi.check(userId, loc);
  ctx.response.body = { code: 0, results };
  return;
};

exports = module.exports = {
  "POST /api/passage/fetch": fetch,
  "POST /api/passage/collect": collect,
  "POST /api/passage/del": del,
  "POST /api/passage/check": check
};
