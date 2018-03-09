<template>
  <div class="nav-outer">
      <div class="nav-container">
          <div class="nav-option"
          v-for="item in reverseOptions"
          @click="jumpTo(item.href)">
              {{ item.name }}
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'Navigation',
    data(){
        return {
            options:[
                {
                    name:'Home',
                    href:'/home'
                },
                {
                    name:'Blog',
                    href:'/blog'
                },
                {
                    name:'Work',
                    href:'/work'
                },
                {
                    name:'About',
                    href:'/about'
                }
            ]
        }
    },
    computed:{
        reverseOptions(){
            return this.options.reverse()
        }
    },
    methods:{
        jumpTo(href){
            this.$router.push(href)
        }
    }
}
</script>
<style>
    .nav-outer{
        transition: all .5s linear;
        height: 10vh;
        width:100%;
        position: fixed;
        left:0;
        top:0;
        z-index:900;
        background-color: red;
    }
    .nav-container::after,.nav-outer::after{
        clear: both;
        display: block;
        visibility: hidden;
        content: "";
    }
    .nav-container{
        text-align: center;
        font-size:15px;
        font-weight: 900;
        color:white;
        background-color: white;
        width:60%;
        float: right;
        height: 100%;
        padding-left:10px;
        padding-right:10px;
    }
    .nav-option{
        /* 实现水平垂直居中 */
        display: flex;
        /* justify-content: center; */
        align-items: center;
        /***/
        cursor: pointer;
        background-color: blue;
        height: 100%;
        vertical-align: center;
        float: right;
        padding-left: 5%;
        padding-right: 5%;
    }
    
</style>
