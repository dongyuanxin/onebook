"use strict";
const crypto = require("crypto");

// 判断是否为空字符串
const isEmptyStr = str => str === "" || str === undefined || str === null;

const sha256 = str => {
  let hash = crypto.createHash("sha256");
  hash.update(str, "utf8");
  return hash.digest("hex");
};

// 生成长度为 length 的随机字符串
const generateRandomStr = length => {
  length = length || 0;
  let arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  let arrLen = arr.length,
    str = "",
    index = 0;
  for (let i = 0; i < length; ++i) {
    str = str + arr[parseInt(Math.random() * arrLen, 10)];
  }
  return str;
};

// 得到时区对应的时间戳
const getOffsetTime = offset => {
  let date = new Date();
  let now = date.getTime(),
    localOffset = date.getTimezoneOffset() * 60 * 1000;
  let utc = now + localOffset; // 全球统一时间
  return offset && offset <= 12 && offset >= -12
    ? utc + 60 * 60 * 1000 * offset
    : utc;
};

module.exports = {
  isEmptyStr,
  sha256,
  generateRandomStr,
  getOffsetTime
};
