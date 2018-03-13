<template>
  <div class="home" ref="home">
    <navigation :style="{opacity:navOpacity}"></navigation>
      <vue-particles
        class='particles'
        :style="{opacity:particleOpacity}"
        color="#cccccc" 
        :clickEffect="true"
        shapeType = "polygon"
        :particlesNumber = "100"
        :linesDistance = "130"
      ></vue-particles>
    <div class="hero" v-for="(item,index) in msg"  :class="getHeroClass(index)">
      <span @mouseenter="particleOpacity=0" @mouseleave="particleOpacity = 1" @click="jumpTo(item.href)"> {{ item.info }} </span>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import MyFooter from '@/views/Footer'
export default {
  name: 'Home',
  data () {
    return {
      msg: [
        {
          info:'I\'m GODBMW',
          href:'/blog'
        },
        {
          info:'Read BLOG',
          href:'/blog'
        },
        {
          info:'See WORK',
          href:'/blog'
        }
      ],
      index:0,
      scrollTop:{
        last:0,
        now:0,
        ready:true
      },
      navOpacity:0,
      showParticals:true,
      particleOpacity:1
    }
  },
  components:{
    Navigation,
    MyFooter
  },
  methods:{
    getHeroClass(index){
      return index%2===0?'plural-hero':'odd-hero'
    },
    handleScroll:function(event){
      this.flushNav()
      if(this.scrollTop.ready) {
        this.scrollTop.now = document.documentElement.scrollTop
        let direction = this.scrollTop.now>this.scrollTop.last ?'down' :'up'
        // 缓存机制，防止浏览器卡死
        this.scrollTop.ready = false
        // this.moveTo(direction) // bug
        let that = this
        setTimeout(function(){
          // 获取上次的滚动后的scrollTop，不能放在setTimeout外面，因为有延迟
          that.scrollTop.last = document.documentElement.scrollTop
          that.scrollTop.ready=true
        },300)
      }
    },
    flushNav(){
      let { scrollTop,clientHeight } = document.documentElement
      this.navOpacity = (scrollTop + 10) > clientHeight ? 1 : 0;
    },
    moveTo(direction){
      let { scrollHeight ,scrollTop,clientHeight } = document.documentElement
      console.log(scrollHeight + ' ' +  clientHeight + ' '+ scrollTop)
      if(direction==='down') {
        document.documentElement.scrollTop = 1234
      }
    },
    jumpTo(href){
      this.$router.push(href)
    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hero {
  /* 实现 hero 占满屏幕，并且不出现 scroll*/
  margin-top:0px !important; 
  height: 100vh;
  width: 100%;
  /* *** */
  position: relative;
  text-align: center;
  margin-top:10px;
  font-family: "Montserrat", sans-serif;
}

/* 单数和复数位置的页面 */
.odd-hero {
  background-color: #bbbbc4;
  color: #282931;
}
.odd-hero span{
  border-bottom: 2px solid #282931;
}
.plural-hero{
  background-color: #282931;
  color: #bbbbc4;
}
.plural-hero span{
  border-bottom: 2px solid #bbbbc4;
}
/*****/

.hero span{
  cursor: pointer;
  font-size: 50px;
  font-weight: 500;
  letter-spacing: 2px;
  padding-bottom: 2px;
  /* 实现span标签剧中效果 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  /* *** */
  z-index: 200;
}

.particles {
  position: fixed;
  left:0;
  right: 0;
  z-index: 100;
  height: 100vh;
  transition: all .5s linear;
}
</style>
