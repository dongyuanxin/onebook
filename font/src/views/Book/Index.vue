<template>
  <div>
    <div class="book-content--container">
      <book-content :root-url="rootUrl" :psg-id="psgId"></book-content>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "@/components/NavFooter";
import BookContent from "@/views/Book/Content";
import Passage from "@/vendor/passage";
import { configFile } from "@/vendor/setting";
const psgApi = new Passage();
const helpMd = {
  name: "book",
  params: {
    platform: "github",
    user: "dongyuanxin",
    depository: "book"
  },
  query: {
    psgId: "Statement/介绍和说明.md"
  }
};
export default {
  data() {
    return {
      rootUrl: "",
      psgId: "",
      summary: {}
    };
  },
  beforeMount() {
    this.handleRoute();
  },
  watch: {
    $route(to, from) {
      this.handleRoute();
    }
  },
  methods: {
    handleRoute() {
      this.rootUrl = psgApi.getRootUrl(this.$route.params);
      psgApi
        .checkConfig(this.rootUrl)
        .then(data => {
          this.summary = data.summary;
          this.psgId = this.$route.query.psgId || this.$route.query.psgid;
        })
        .catch(error => {
          this.$router.push(helpMd);
        });
    }
  },
  components: {
    BookContent,
    NavFooter
  }
};
</script>

<style lang="scss" scoped>
$content-width: 800px !default;
$max-width: 900px !default;
.book-content--container {
  width: $content-width;
  margin: 0 auto;
  padding-top: 50px;
  transition: all 0.3s linear;
}

@media (max-width: $max-width) {
  .book-content--container {
    width: 100%;
    padding-top: 20px;
  }
}
</style>
