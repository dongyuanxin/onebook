<template>
    <div class="book-header">
        <span class="iconfont icon-sort left-icon" 
        @mouseenter="iconName='目录'" 
        @mouseleave="iconName=''"
        @click="moveSide()"
        ></span>
        <span class="iconfont icon-fenlei left-icon"  @mouseenter="iconName='分类'" @mouseleave="iconName=''"></span>
        <span class="iconfont icon-zhihu right-icon"  @mouseenter="iconName='知乎'" @mouseleave="iconName=''" ></span>
        <span class="iconfont icon-weibo right-icon"  @mouseenter="iconName='微博'" @mouseleave="iconName=''"></span>
        <span class="icon-name"  :style="{opacity:iconNameOpacity}">{{iconName}}</span>
    </div>
</template>
<script>
export default {
    data(){
        return {
            iconName:""
        }
    },
    computed:{
        iconNameOpacity(){
            return this.iconName===""?"0":"0.8"
        }
    },
    methods:{
        moveSide(){
            this.$emit("toggleside") // 关闭父组件的目录导航栏
        }
    }
}
</script>
<style>
    .book-header{
        /* 会水平溢出 */
        /* width: 100%; */
        padding:15px 30px;
        height: 20px;
        line-height: 20px;
        position: relative;
    }
    .book-header::after{
        clear: both;
        display: block;
        visibility: hidden;
        content: " ";
        overflow: hidden;
    }
    /** icon动画样式 **/
    .book-header .iconfont{
        opacity: 0.3;
        transition: all .3s linear;
    }
    .book-header .iconfont:hover{
        opacity: 1.0;
    }
    /***/
    .book-header .left-icon{
        margin-right:30px;
        float :left;
        display: block;
    }
    .book-header .right-icon{
        margin-left:30px;
        float :right;
        display: block;
    }

    .book-header .icon-name{
        position: absolute;
        left:50%;
        font-size:20px;
        transition: all .3s linear;
    }
</style>
