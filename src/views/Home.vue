<template>
    <div>
        <navigation></navigation>
        <div class="dev-home" 
        v-for=" (item , index) in imgSrcArr "
        :style=" { backgroundImage : 'url('+item+')' , opacity : bgOpacity( index )} ">
        </div>
        <div class="dev-intro">
            <div class="dev-intro--title" 
            @click="jumpTo( href )">
                {{ intro.title }}
            </div>
            <div class="dev-intro--sentence">
                {{ intro.sentence }}
            </div>
        </div>
    </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue'

export default {
    data(){
        return {
            imgSrcArr : [
                '/static/images/background/1.jpg',
                '/static/images/background/2.jpg',
                '/static/images/background/3.jpg'
            ],
            introArray : [
                {
                    title : 'onebook',
                    sentence : 'open-source platform',
                    href : '/'
                },
                {
                    title : 'book',
                    sentence : 'get your own book',
                    href : '/'
                },
                {
                    title : 'write',
                    sentence : 'write whatever want',
                    href : '/'
                }
            ],
            scanNow : 0 ,
            interval : 4000 
        }
    },
    mounted(){
        let that = this
        setInterval( function() {
            that.scanNow = ( that.scanNow + 1 ) % that.imgSrcArr.length ;
        } , that.interval )
    },
    computed:{
        intro(){
            return this.introArray[ this.scanNow ]
        },
        href(){
            return this.introArray[ this.scanNow ].href
        }
    },
    methods:{
        bgOpacity( index ){
            return index === this.scanNow ? '1.0' : '0' ; 
        },
        introMargin( index ) {
            return index === this.scanNow ? '0px' : '100%';
        },
        toggleBg(){
            this.scanNow = ( this.scanNow + 1 ) % this.imgSrcArr.length ;
        },
        jumpTo(href){
            this.$router.push( href )
        }
    },
    components : {
        Navigation
    }
}
</script>

<style>
    @keyframes toggler{
        0% {
            margin-left: 100%;
            opacity: 1.0;
        }
        50% {
            margin-left: 0px;
            opacity: 1.0;
        }
        90% {
            margin-left: 0px;
            opacity: 1.0;
        }
        99%{
            margin-left: 0px;
            opacity: 0.0;
        }
        100%{
            margin-left: 100%;
            opacity: 0;
        }
    }
    .dev-home {
        width: 100%;
        height: 100vh;
        background-size: 100% 100vh;
        background-repeat: no-repeat;
        transition : opacity 0.5s linear;
        position: fixed;
        /* filter: blur(2px); */
    }
    .dev-intro {
        width:100%;
        position: fixed;
        z-index: 300;
        top : 50%;
        left: 50%;
        text-align: center;
        color: white;
        font-size: 100px;
    }
    .dev-intro {
        transition: all 1s linear;
        transform: translate(-50% , -70%);
        animation: toggler 4s linear infinite; 
    }
    .dev-intro--title {
        font-size : 1em;
        cursor: pointer;
    }
    .dev-intro--sentence {
        font-size: 0.5em;
    }
</style>
