<template>
    <div class="paper-container">
        <div class="paper">
            <div class="paper-content">
                <textarea autofocus v-text="msg"></textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg : "Hello, it's just a beautiful platform for writting supported by godbmw.\nPlease write now.\n\n"
        }
    },
    mounted(){
        if (this.$route.query.hasOwnProperty('share')) { // 如果用于分享界面
            this.msg = `Your passage URL is: (您文章的分享链接是：)
${this.$route.query.share}

You can edit the content you are about to share here: (在这里编辑您要分享的内容：)

`
        }
    }
}
</script>

<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto);
    @import url(https://fonts.googleapis.com/css?family=Handlee);

    body {
        /* background: #91D1D3; */
        font-family: 'Roboto', sans-serif;
    }
    .paper-container{
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 300;
        transform: translate(-50%,-50%);
        width: 100%;
    }
    .paper {
        position: relative;
        width: 90%;
        max-width: 800px;
        min-width: 400px;
        /* height: 390px; */
        height: 90vh;
        margin: 0 auto;
        background: #fafafa;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .3);
        overflow: hidden;
    }

    .paper:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 60px;
        background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
        background-size: 30px 30px;
        border-right: 3px solid #D44147;
        box-sizing: border-box;
    }

    .paper-content {
        position: absolute;
        top: 30px;
        right: 0;
        bottom: 30px;
        left: 60px;
        background: linear-gradient(transparent, transparent 28px, #91D1D3 28px);
        background-size: 30px 30px;
    }

    .paper-content textarea {
        width: 100%;
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        line-height: 30px;
        padding: 0 10px;
        border: 0;
        outline: 0;
        background: transparent;
        color: mediumblue;
        font-family: 'Handlee', cursive;
        font-weight: bold;
        font-size: 18px;
        box-sizing: border-box;
        z-index: 1;
    }
</style>
