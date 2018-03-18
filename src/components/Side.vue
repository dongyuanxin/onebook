<template>
    <div class="side" v-html="summary" ref="side">
    </div>
</template>
<script>
import axios from "axios"
import {json2html} from "@/utils/json2html.js"
import {replaceImgPath} from "@/utils/replaceImgPath.js"
export default {
    data(){
        let user = this.$route.params.user , name = this.$route.params.name // github名字和仓库名
        let api = 'https://raw.githubusercontent.com/' + ((user)?(user+'/'):'godbmw/') + ((name)?(name+'/'):'book/') + 'master/'
        console.log("Your github raw api is : " + api)
        return {
            summary:"", // 目录的string格式
            hrefs:"",
            api,
            content:""
        }
    },
    methods:{
        handleClickOnHref(){ // 为每个<a>标签绑定事件
            let that = this
            let helper = function(url,href){
                return async function(e) {
                    let originalKey = localStorage.getItem('content-key')
                    localStorage.setItem('content-key',href.getAttribute('data'))
                    try{
                        await that.readMdFromGithub(url)
                    } catch( err ) { // 404Error,重新设置缓存
                        console.log(`Can't find url`)
                        localStorage.setItem('content-key',originalKey)
                    }
                }
            }
            let uri = ''
            for (let href of this.hrefs) {
                uri = this.getMdUri(href,false)
                href.addEventListener('click',helper(uri,href)) // 请查看 《JavaScript使用精粹》 P39 闭包高级应用
            }
        },
        readMdFromGithub(uri){ // 异步请求github上的仓库文章
            let keys = localStorage.getItem('content-key').split('*'),
                that = this,
                base = ''
            keys.pop() // 最后一个元素代表Markdown文件命名,不属于路径
            base = this.api + keys.join('/')
            return new Promise(function(resolve,reject){
                axios.get(uri)
                .then(res=> {
                    that.content = replaceImgPath(base,res.data) // 图片路径换为绝对路径
                    that.$emit("flushcontent",that.content)
                    resolve('ok')
                })
                .catch(err=> reject(err))
            })
        },
        getMdUri(dom,save){ // 将<a>标签的data属性处理成github的超链接样式
            let data = dom.getAttribute('data')
            if(save === true) { // 如果保存当前的data为contentKey的话
                localStorage.setItem('content-key',data) // 更新contentKey,用于 原页面 刷新的验证
            }
            return (this.api + data.split('*').join('/'))
        }
    },
    mounted:function(){
        // 获取 后台的文章目录
        if(this.summary === "") { // 只一次加载
            axios.get(this.api + 'book.json')
            .then(res=>{
                this.summary = json2html(res.data.summary)
            })
        }
    },
    async updated(){
        this.hrefs = this.$refs.side.getElementsByTagName("a")
        let defaultUri = ''
        if( this.$route.query.hasOwnProperty('key')) { // 如果url中给出了文章key,那么拉取对应文章,并且覆盖之前的 content-key
            defaultUri = this.api + this.$route.query.key.split('*').join('/')
            localStorage.setItem('content-key',this.$route.query.key)
        } else if( localStorage.getItem('content-key') !==null  ){ // 然后,读取缓存中的contentKey属性判断是否是"原页面刷新"
            defaultUri = this.api + localStorage.getItem('content-key').split('*').join('/')
        } else { // 在不显示给出uri与本地没有缓存的情况下 : 默认拉取第一个<a>标签的文章内容,并且给 content-key 赋值
            defaultUri = this.getMdUri(this.hrefs[0],true)
        }
        try{
            await this.readMdFromGithub(defaultUri)
        } catch(error) { // 如果github用户名和仓库名错误，那么重新拉取 博客作者 的 book
            this.api = 'https://raw.githubusercontent.com/godbmw/book/master/'
            defaultUri = this.getMdUri(this.hrefs[0],true)
            await this.readMdFromGithub(defaultUri)
        }
        this.handleClickOnHref() // 为<a>标签绑定事件
    }
}
</script>
<style>
.side{
    margin-right: 20px; /* 主要是防止滚动条样式 */
    width: 300px;
    background: #f6f8fa;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    text-overflow: ellipsis !important; /*超出部分省略号显示 */
    font-size:15px;
    vertical-align: center;
    cursor:not-allowed;
}

.side a{
    font-size: 0.9em;
}
.side .level-1 , .side .level-2 {
    margin:8px 0;
}
.side .level-1 {
    padding-left:10px;
    opacity: 0.9;
    text-shadow: 1px 1px 1px #111111;
}

.side .level-2{
    padding-left:20px;
    opacity: 0.7;
    text-shadow: 1px 1px 1px #111111;
}

/**移入特效*/
.side a{
    font-family: "微软雅黑","Open Sans","Helvetica Neue",Arial,sans-serif;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    margin-left:30px;
    margin-top:5px !important;
    margin-bottom:5px !important;
    opacity: 0.9;
    color: #666600;
}
.side a:hover {
    color: #22a7f0;
} 

.side a:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom:-2px;
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
