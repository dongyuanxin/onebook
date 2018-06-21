<template>
  <div class="markdown-body" v-html="htmlContent">
  </div>
</template>
<script>
import axios from "axios";
import Markdown from "@/vendor/markdown.js";
import hub from "@/vendor/hub.js";
const mdApi = new Markdown();
export default {
  props: {
    rootUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: ""
    };
  },
  mounted() {
    if (this.isEmptyStr(this.rootUrl) === false) {
      this.fetchContent();
    }
  },
  watch: {
    rootUrl: function(val, oldVal) {
      console.log(val);
      if (val !== oldVal || this.isEmptyStr(val) === false) {
        this.fetchContent();
      }
    },
    $route(to, from) {
      this.fetchContent();
    }
  },
  computed: {
    htmlContent() {
      return mdApi.format(this.content, "");
    }
  },
  methods: {
    isEmptyStr(str) {
      return str === undefined || str === "";
    },
    fetchContent() {
      let arr = this.$route.query.psgId.split(".");
      let path = this.rootUrl + this.$route.query.psgId.replace(/\*/g, "/");
      axios.get(path).then(res => {
        let lang = arr[arr.length - 1];
        this.content =
          lang === "md" ? res.data : this.codeToContent(res.data, lang);
        hub.$emit("resolve", this.content);
      });
    },
    codeToContent(code, lang) {
      let map = {
        js: "javascript",
        py: "python",
        java: "java",
        c: "cpp",
        cpp: "cpp",
        php: "php",
        html: "html",
        css: "css",
        scss: "scss",
        sh: "shell"
      };
      return "```" + map[lang] + "\n" + code + "\n```";
    }
  }
};
</script>
<style lang="scss" scoped>
.book-content--container {
  width: 100%;
}
</style>
