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
      let path = this.rootUrl + this.$route.query.psgId.replace(/\*/g, "/");
      axios.get(path).then(res => {
        this.content = res.data;
        hub.$emit("resolve", this.content);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.book-content--container {
  width: 100%;
}
</style>
