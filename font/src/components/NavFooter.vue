<template>
  <div class="footer">
    <a :href="href" :download="download"><i  class="iconfont icon-xiazai"> </i></a>
    <el-popover placement="left-start" trigger="click">
      <canvas id="qrcode-img"></canvas>
      <i class="iconfont icon-erweima" slot="reference"></i>
    </el-popover>
    <i class="iconfont icon-xiangshang" @click="upTo(200)"></i>
  </div>
</template>
<script>
import "@/assets/css/element-ui.css";
import hub from "@/vendor/hub.js";
import QRCode from "qrcode";
export default {
  data() {
    return {
      qrcodeEle: null,
      timer: null,
      href: "",
      download: ""
    };
  },
  mounted() {
    this.qrcodeEle = document.getElementById("qrcode-img");
    this.initQrcode(
      this.qrcodeEle,
      window.encodeURI(window.location.href),
      "180"
    );
    hub.$on("resolve", content => {
      let psgId = this.$route.query.psgId || this.$route.query.psgid,
        index = psgId.lastIndexOf("*") !== -1 ? psgId.lastIndexOf("*") : psgId.lastIndexOf("/")
      this.download = psgId.substr(index + 1);
      this.href = "data:text/plain," + content;
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    initQrcode(ele, url, width) {
      QRCode.toCanvas(
        ele,
        url,
        {
          width: width || "300"
        },
        error => {
          if (error) return console.error(error);
        }
      );
    },
    upTo(delay) {
      let scrollTop = parseInt(document.documentElement.scrollTop, 10);
      if (scrollTop <= 20) {
        document.documentElement.scrollTop = 0;
        return;
      }
      let step = Math.ceil(10 * scrollTop / delay);
      this.timer = setInterval(() => {
        scrollTop = parseInt(document.documentElement.scrollTop, 10);
        if (scrollTop - step <= 0) {
          document.documentElement.scrollTop = 0;
          clearInterval(this.timer);
        } else {
          document.documentElement.scrollTop = scrollTop - step;
        }
      }, 10);
    }
  }
};
</script>
<style scoped>
.footer {
  position: fixed;
  z-index: 500;
  bottom: 7px;
  right: 10px;
}
.footer i {
  display: block;
  text-align: center;
  font-size: 1.3em;
  padding: 5px;
  border-radius: 50%;
  color: white;
  background-color: #222;
  cursor: pointer;
  margin-bottom: 5px;
}
</style>
