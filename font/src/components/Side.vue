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
            summary:"",
            hrefs:""
        }
    },
    methods:{
        handleClickOnHref(){
            this.hrefs = this.$refs.side.getElementsByTagName("a")
            console.log(this.hrefs)
        }
    },
    mounted:function(){
        if(this.summary === "") {
            axios.get("/api/summary")
            .then(res=>{
                this.summary = json2html(res.data)
                this.handleClickOnHref()
            })
        }
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
    transition: all .3s linear;
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
