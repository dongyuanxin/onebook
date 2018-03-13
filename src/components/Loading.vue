<template>
    <div  class="test">
        <span class="iconfont icon-jiazai loading">
        </span>   
    </div>
</template>
<style>
    /* v2.0 版本添加 */
    @keyframes myload {
        0%{ 
            transform:rotate(0deg); 
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
        }
        100%{ 
            transform: rotate(360deg); 
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
        }
    }
    test{
        position: relative !important; 
    }
    span.loading{
        position: absolute;
        font-size: 50px;
        width: 10%;
        height: 10%;
        color: red;
        /* transition: all .5s ease-in-out; */
    }
    span.loading::before{
        animation: myload 5s infinite linear;
        -webkit-animation: myload 5s infinite linear;
        -moz-animation: myload 5s infinite linear;
        -o-animation: myload 5s infinite linear;
    }
</style>
