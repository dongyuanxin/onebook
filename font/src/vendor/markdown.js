import "@/assets/css/github-markdown.css";
import "highlight.js/styles/atom-one-light.css";
import hljs from "highlight.js";
import Marked from "marked";

Marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
});

const replaceImgPath = (str, imgUlr) => {
  let re = /!\[.*?\]\((.*?)\)/gm,
    replacedStr = "",
    exec = null,
    last = 0;
  while ((exec = re.exec(str)) !== null) {
    replacedStr +=
      str.substring(last, exec.index) +
      exec["0"].replace(exec["1"], imgUlr + exec["1"]);
    last = exec.index + exec["0"].length;
  }
  replacedStr += str.substr(last);
  return replacedStr;
};

const Markdown = () => {};

Markdown.prototype.format = (str, imgUrl) => {
  imgUrl = imgUrl || "";
  return Marked(replaceImgPath(str, imgUrl));
};

export default Markdown;
