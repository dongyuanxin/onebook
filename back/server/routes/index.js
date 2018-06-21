"use strict";

exports = module.exports = {
  "GET /": (ctx, next) => {
    ctx.response.body = global.views["index"];
    ctx.status = 200;
  }
};
