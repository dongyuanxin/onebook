<template>
    <div class="book-header">
        <span class="iconfont icon-sort left-icon" 
        @mouseenter="iconName='目录'" 
        @mouseleave="iconName=''"
        @click="moveSide()"
        ></span>
        <span class="iconfont icon-fenxiang left-icon"  @mouseenter="iconName='分享 --让世界倾听你的声音'" @mouseleave="iconName=''" @click="jumpTo('/paper','share')"></span>
        <span class="iconfont icon-shouye right-icon"  @mouseenter="iconName='首页'" @mouseleave="iconName=''" @click="jumpTo('/')"></span>
        <span class="iconfont icon-github right-icon"  @mouseenter="iconName='源码'" @mouseleave="iconName=''" @click="jumpTo('https://github.com/godbmw/onebook')"></span>
        <div class="icon-name" :style="{opacity:iconNameOpacity}">{{iconName}}</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      iconName: ""
    }
  },
  computed: {
    iconNameOpacity() {
      return this.iconName === "" ? "0" : "0.8";
    }
  },
  methods: {
    moveSide() {
      this.$emit("toggleside"); // 关闭父组件的目录导航栏
    },
    jumpTo(href,...rest) {
      if (href.indexOf("http") > -1) {
        // 外网链接
        window.location.href = href;
      } else {
        if(rest[0] === 'share') { // 进入分享页面
          this.$router.push({
            path:href,
            query:{share : this.$store.state.url + this.$route.fullPath + '?' + 'key=' + localStorage.getItem('content-key')}
          })
        } else {
          this.$router.push(href); 
        }
        
      }
    }
  }
};
</script>
<style>
.book-header {
  /* 会水平溢出 */
  /* width: 100%; */
  padding: 15px 30px;
  height: 20px;
  line-height: 20px;
  position: relative;
}
.book-header::after {
  clear: both;
  display: block;
  visibility: hidden;
  content: " ";
  overflow: hidden;
}
/** icon动画样式 **/
.book-header .iconfont {
  opacity: 0.3;
  transition: all 0.3s linear;
}
.book-header .iconfont:hover {
  cursor: pointer;
  opacity: 1;
}
/***/
.book-header .left-icon {
  margin-right: 30px;
  float: left;
  display: block;
}
.book-header .right-icon {
  margin-left: 30px;
  float: right;
  display: block;
}

.book-header .icon-name {
  position: absolute;
  left: 50%;
  font-size: 20px;
  transition: all 0.3s linear;
  transform: translate(-50%, 0);
}
</style>
