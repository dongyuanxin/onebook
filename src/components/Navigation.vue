<template>
  <div class="nav-outer">
      <div class="nav-brand">
          <slot name="brand"></slot>
      </div>
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
                    name:'Book',
                    href:'/book'
                },
                {
                    name:'Write',
                    href:'/paper'
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
        transition: all .3s linear;
        height: 10vh;
        width:100%;
        position: fixed;
        left:0;
        top:0;
        z-index:900;
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
        width:60%;
        float: right;
        height: 100%;
        padding-left:10px;
        padding-right:10px;
    }
    .nav-brand {
        text-align: center;
        font-size:35px;
        font-weight: 900;
        color:white;
        float: left;
        height: 100%;
        vertical-align: center;
        display: flex;
        align-items: center;
        padding-left: 15%;  
        font-weight: 900;
        font-style:italic;
        color:#FF6666;
        font-family: 'Comic Sans MS', cursive;
    }
    .nav-option{
        /* 实现水平垂直居中 */
        display: flex;
        /* justify-content: center; */
        align-items: center;
        /***/
        cursor: pointer;
        height: 100%;
        vertical-align: center;
        float: right;
        padding-left: 5%;
        padding-right: 5%;
    }
    
</style>
