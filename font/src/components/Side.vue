<template>
    <div class="side" v-html="summary" ref="side">
    </div>
</template>
<script>
import axios from "axios"
import {json2html} from "@/utils/json2html.js"
export default {
    data(){
        return {
            summary:"", // 目录的string格式
            hrefs:"",
            api:'https://raw.githubusercontent.com/godbmw/passages/master/',
            content:""
        }
    },
    methods:{
        // 为每个<a>标签绑定事件
        handleClickOnHref(){
            let that = this
            let helper = function(url){
                return function(e) {
                    that.readMdFromGithub(url)
                }
            }
            let uri = ''
            for (let href of this.hrefs) {
                uri = this.getMdUri(href)
                href.addEventListener('click',helper(uri)) // 请查看 《JavaScript使用精粹》 P39 闭包高级应用
            }
        },
        // 异步请求github上的仓库文章
        readMdFromGithub(uri){
            axios.get(uri)
            .then(res=> {
                this.$emit("flushcontent",res.data)
                this.conetnt = res.data
            })
            .catch(err=> console.log(err.message))
        },
        // 将<a>标签的data属性处理成github的超链接样式
        getMdUri(dom){
            let data = ''
            data = dom.getAttribute('data')
            return (this.api + data.trim().split(' ').join('/'))
        }
    },
    mounted:function(){
        // 获取 后台的文章目录
        if(this.summary === "") { // 只一次加载
            axios.get("/api/summary")
            .then(res=>{
                this.summary = json2html(res.data)
            })
        }
    },
    updated(){
        /** 默认拉取第一个<a>标签的文章内容 */
        this.hrefs = this.$refs.side.getElementsByTagName("a")
        let defaultUri = this.getMdUri(this.hrefs[0])
        this.readMdFromGithub(defaultUri)
        /** */
        this.handleClickOnHref()
    }
}
</script>
<style>
.side{
    margin-right: 20px;
    width: 300px;
    background: #f6f8fa;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    text-overflow:ellipsis; /* 超出部分省略号显示 */
    font-size:15px;
}
.side p{
    height: 30px;
    line-height: 30px;
}
.side a{
    height: 20px;
    line-height: 2em;
}
.side .level-1 {  
    padding-left:10px;
    opacity: 0.7;
}

.side .level-2{
    padding-left:30px;
    opacity: 0.7;
}

.side a{
    margin-left:50px;
}

/**移入特效*/
.side a{
    font-family: "微软雅黑","Open Sans","Helvetica Neue",Arial,sans-serif;
    position: relative;
    line-height: 36px;
    text-decoration: none;
    cursor: pointer;
}
.side a:hover {
    color: #22a7f0;
} 

.side a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom:-5px;
    left: 0;
    background-color: #019875;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    -o-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}         
.side a:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    -o-transform: scaleX(1);
    transform: scaleX(1);
}       
</style>
