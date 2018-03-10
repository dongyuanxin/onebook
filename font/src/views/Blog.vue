<template>
    <div class="blog special-scrollbar">
        <side class="left-side" :style="{'margin-left':sideOffset}"></side>
        <book-header @toggleside="showSide = !showSide"></book-header>
        <div class="markdown-body">
            <h1>Unicorns</h1>
            <p>All the things</p>
            <pre>import Hello from test</pre>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <p>首先声明，<br/>我和张晓翀都不是算法牛人，确切的说应该是算法的门外汉，小白一个。所以我们为了撬开算法的大门，各自刷完了一遍LeetCode的题目，这其中碰到了很多困难，当然也少不了用了Google以及参考了别人的代码。</p>
            <p>首先声明，我和张晓翀都不是算法牛人，确切的说应该是算法的门外汉，小白一个。所以我们为了撬开算法的大门，各自刷完了一遍LeetCode的题目，这其中碰到了很多困难，当然也少不了用了Google以及参考了别人的代码。</p>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <p>首先声明，我和张晓翀都不是算法牛人，确切的说应该是算法的门外汉，小白一个。所以我们为了撬开算法的大门，各自刷完了一遍LeetCode的题目，这其中碰到了很多困难，当然也少不了用了Google以及参考了别人的代码。</p>
            <p>首先声明，我和张晓翀都不是算法牛人，确切的说应该是算法的门外汉，小白一个。所以我们为了撬开算法的大门，各自刷完了一遍LeetCode的题目，这其中碰到了很多困难，当然也少不了用了Google以及参考了别人的代码。</p>
        </div>

    </div>
</template>
<script>
import GithubMdCss from 'github-markdown-css'
import Side from '@/components/Side'
import BookHeader from '@/components/header/BookHeader'
export default {
    data(){
        return{
            showSide:false
        }
    },
    computed:{
        sideOffset(){
            return this.showSide ? "0px":"-320px" 
        }
    },
    components:{
        Side,
        BookHeader
    }
}
</script>
<style>
    .left-side{
        left:0;
        top: 0;
        position: fixed;
    }
    /***/
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
