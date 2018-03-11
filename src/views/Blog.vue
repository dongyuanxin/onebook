<template>
    <div class="blog special-scrollbar">
        <div class="left-side" :style="{'margin-left':sideOffset}" @click="showSide = false">
            <side  @flushcontent="flushContent"></side>
        </div>
        <book-header @toggleside="showSide = !showSide"></book-header>
        <div class="markdown-body" @click="showSide = false">
            <vue-markdown :source="content"></vue-markdown>
        </div>
        <div class="blog-cover" v-show="showSide === true" @click="showSide=false">
            <cover-layer></cover-layer>
            <!-- 不能写成 <cover-layer @click="..."></cover-layer>
            也不能在@click里面调用 不在this对象中的函数，例如 console... -->
        </div>
    </div>
</template>
<script>
import GithubMdCss from 'github-markdown-css'
import VueMarkdown from 'vue-markdown'
import Side from '@/components/Side'
import BookHeader from '@/components/header/BookHeader'
import CoverLayer from '@/components/CoverLayer'
export default {
    data(){
        return{
            showSide:false,
            content:""
        }
    },
    computed:{
        sideOffset(){
            return this.showSide ? "0px":"-320px" 
        }
    },
    methods:{
        flushContent(content) {
            this.content = content
        },
        test(){
            alert('123')
        }
    },
    components:{
        Side,
        BookHeader,
        VueMarkdown,
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
    /** github-markdown样式 */
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }
    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
        .book-header {
            padding:15px 20px !important;
        }
    }

</style> 
