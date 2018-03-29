<template>
    <div class="blog special-scrollbar">
        <div class="left-side" :style="{'margin-left':sideOffset}" @click="showSide = false">
            <side  @flushcontent="flushContent"></side>
        </div>
        <div class="-book-header">
            <book-header @toggleside="showSide = !showSide"></book-header>
        </div>
        <div class="markdown-body" @click="showSide = false" v-html="htmlContent"></div>
        <div class="blog-cover" v-show="showSide === true" @click="showSide=false">
            <cover-layer></cover-layer>
        </div>
    </div>
</template>
<script>
import Side from '@/views/book/BookSide'
import BookHeader from '@/views/book/BookHeader'
import CoverLayer from '@/components/CoverLayer'

import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import Marked from 'marked'
Marked.setOptions({
    highlight: (code) => hljs.highlightAuto(code).value
})

export default {
    data(){
        return{
            showSide:false,
            content:"",
            loaded:false
        }
    },
    computed:{
        sideOffset(){
            return this.showSide ? "0px":"-320px" 
        },
        htmlContent(){
            return Marked(this.content)
        }
    },
    methods:{
        flushContent(content) { // 子组件触发事件
            this.content = content
        }
    },
    components:{
        Side,
        BookHeader,
        CoverLayer
    }
}
</script>
<style>
    .left-side{
        left:0;
        top: 0;
        position: fixed;
        z-index: 300;
        transition: all .3s linear;
    }
    .blog-cover {
        left:0;
        top:0;
        position: fixed;
        z-index: 200;
        width: 100%;
        height: 100%;
    }
    .-book-header {
        width: 100%;
        position: fixed;
        top:0;
        left: 0;
    }
    /** github-markdown样式 */
    @media (max-width: 767px) {
        .book-header {
            padding:15px 20px !important;
        }
    }

</style> 
