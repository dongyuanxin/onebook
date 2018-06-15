<template>
  <div>
    <book-catalogue :summary="summary"></book-catalogue>
    <div class="book-content--container">
      <book-content :root-url="rootUrl" ></book-content>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from "@/components/NavFooter";
import BookCatalogue from "@/views/Book/Catalogue";
import BookContent from "@/views/Book/Content";
import Passage from "@/vendor/passage";
import { configFile, helpMdRoute } from "@/vendor/setting";
const psgApi = new Passage();
export default {
  data() {
    return {
      rootUrl: "",
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
        })
        .catch(error => {
          this.$router.push(helpMdRoute);
        });
    }
  },
  components: {
    BookContent,
    NavFooter,
    BookCatalogue
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
