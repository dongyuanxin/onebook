<template>
  <div>
    <div class="blog-cover" v-show="showLayer === false" >
      <cover-layer></cover-layer>
        <!-- 不能写成 <cover-layer @click="..."></cover-layer>
        也不能在@click里面调用 不在this对象中的函数，例如 console... -->
    </div>

      <prompt-box class="chrome-prompt" v-show="showLayer === false">
      <div slot="info" class="chrome-prompt-info" >
        <p>为了更好的UI和特效体验</p>
        <p>请务必使用的Chrome浏览器</p>
      </div>
      <div slot="button" class="chrome-prompt-button" @click="updateChecked()">确定</div>
      </prompt-box>
  </div>
</template>
<script>
import CoverLayer from '@/components/CoverLayer'
import PromptBox from '@/components/PromptBox'
export default {
    name:'Footer',
    data() {
      return {}
    },
    mounted(){
      let userAgent = navigator.userAgent
      this.$store.commit('checkChrome',userAgent)
      if(this.$store.state.isChrome) this.updateChecked()
    },
    computed:{
      showLayer(){
         return this.$store.state.checked
      }
    },
    methods:{
      updateChecked(){
        this.$store.commit('updateChecked')
      }
    },
    components:{
      CoverLayer,
      PromptBox
    }
}
</script>
<style>
  .blog-cover {
    left:0;
    top:0;
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
  }
  .chrome-prompt {
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 300;
    transform: translate(-50%,-50%);
    background-color: #FFCC99;
  }
  .chrome-prompt .chrome-prompt-info{
    margin: 30px;
    font-weight: bold;
    text-align: center;
    color: #FF0033;
  }
  .chrome-prompt-info p{
    padding:10px;
  }
  .chrome-prompt .chrome-prompt-button{
    text-align: center;
    font-size:1.2em;
    background: white;
    padding: 10px;
    width:100px;
    margin:0 auto;
    border-radius: 8px;
    transition: all .3s linear;
    background: #FF0033;
    color:white;
    font-weight: 900;
    cursor: pointer;
  }
</style>
