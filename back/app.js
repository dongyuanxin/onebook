"use strict";
const { port } = require("./config");
const path = require("path");
const Koa = require("koa");
const app = new Koa();

// 解析body
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

// 注册全局变量
const loader = require("./server/controllers/loader.js")();

// 注册全局路由
const router = require("./server/controllers/router.js");
app.use(router(path.join(__dirname, "server", "routes")));

// 处理 error
app.use(async (ctx, next) => {
  ctx.redirect("/404");
});

app.listen(port);
console.log(`app started at port ${port}`);
