<template>
  <div class="footer">
    <i class="iconfont icon-yonghu" @click="dumpTo"></i>
    <i class="iconfont icon-shoucang" :style="{color: shoucangIconColor}" @click="toggleCollect"></i>
    <a :href="href" :download="download"><i class="iconfont icon-xiazai"> </i></a>
    <el-popover placement="left-start" trigger="click">
      <canvas id="qrcode-img"></canvas>
      <i class="iconfont icon-erweima" slot="reference"></i>
    </el-popover>
    <i class="iconfont icon-xiangshang" @click="upTo(200)"></i>
  </div>
</template>
<script>
import axios from "axios";
import "@/assets/css/element-ui.css";
import hub from "@/vendor/hub.js";
import QRCode from "qrcode";
export default {
  data() {
    return {
      qrcodeEle: null,
      timer: null,
      href: "",
      download: "",
      collect: false,
      userId: "",
      base: "",
      id: -1
    };
  },
  mounted() {
    this.init();
    hub.$on("resolve", content => {
      let psgId = this.$route.query.psgId || this.$route.query.psgid,
        index =
          psgId.lastIndexOf("*") !== -1
            ? psgId.lastIndexOf("*")
            : psgId.lastIndexOf("/");
      this.download = psgId.substr(index + 1);
      this.href = "data:text/plain," + content;
    });
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    shoucangIconColor() {
      return this.collect === true ? "#ff6369" : "white";
    }
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  },
  methods: {
    init() {
      this.userId = window.sessionStorage.getItem("userId");
      this.base = window.sessionStorage.getItem("base");
      this.checkCollect();
      this.qrcodeEle = document.getElementById("qrcode-img");
      this.initQrcode(
        this.qrcodeEle,
        window.encodeURI(window.location.href),
        "180"
      );
    },
    alert(message, type) {
      this.$message({
        message,
        type,
        center: true,
        showClose: true
      });
    },
    checkStatus() {
      const promise = new Promise((resolve, reject) => {
        if (this.userId === "" || this.base === "") {
          reject(new Error("User not login"));
        }
        axios
          .post("/api/user/check", {
            userId: this.userId,
            base: this.base
          })
          .then(res => {
            let data = res.data;
            if (data.code !== 0) reject(new Error(data.msg));
            else resolve(true);
          })
          .catch(error => reject(error));
      });
      return promise;
    },
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
    },
    dumpTo() {
      this.checkStatus()
        .then(_ => {
          this.$router.push({
            name: "space"
          });
        })
        .catch(error => {
          this.$router.push({
            name: "login"
          });
        });
    },
    toggleCollect() {
      this.checkStatus()
        .then(_ => {
          this.collect ? this.cancelCollect() : this.collectArticle();
        })
        .catch(error => {
          this.alert(error.message, "warning");
        });
    },
    checkCollect() {
      let loc = {
        name: this.$route.name,
        query: this.$route.query,
        params: this.$route.params
      };
      axios
        .post("/api/passage/check", {
          userId: this.userId,
          loc: JSON.stringify(loc)
        })
        .then(res => {
          this.collect = res.data.results.success;
          if (this.collect) {
            this.id = res.data.results.row.Id;
          }
        });
    },
    collectArticle() {
      let loc = {
        name: this.$route.name,
        query: this.$route.query,
        params: this.$route.params
      };
      axios
        .post("/api/passage/collect", {
          loc,
          userId: this.userId,
          title: this.download
        })
        .then(res => {
          if (res.data.code === 0) {
            this.collect = true;
            this.id = res.data.results.insertId;
            this.alert("收藏成功", "success");
          } else {
            this.alert("收藏失败", "error");
          }
        })
        .catch(error => this.alert(error.message, "error"));
    },
    cancelCollect() {
      axios
        .post("/api/passage/del", {
          id: this.id
        })
        .then(res => {
          if (res.data.code === 0) {
            this.collect = false;
            this.id = -1;
            this.alert("取消收藏", "success");
          } else {
            this.alert("取消失败", "error");
          }
        })
        .catch(error => this.alert(error.message, "error"));
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none !important;
}
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
