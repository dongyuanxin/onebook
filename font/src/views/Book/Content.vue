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
    },
    psgId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timer: null,
      content: ""
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (
        this.isEmptyStr(this.rootUrl) === false &&
        this.isEmptyStr(this.psgId) === false
      ) {
        this.handleResolve();
      }
    }, 50);
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
    handleResolve() {
      clearInterval(this.timer);
      let path = this.rootUrl + this.psgId.replace(/\*/g, "/");
      axios.get(path).then(res => {
        this.content = res.data;
        hub.$emit("resolve", this.content);
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.book-content--container {
  width: 100%;
}
</style>
