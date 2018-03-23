<template>
    <div>
        <test @childchange = "childChange"></test>
        <div class="test"> {{ msg }} </div>
    </div>
</template>
<script>
import Test from './Test' 
export default {
    data(){
        return {
            msg: 'I am father'
        }
    },
    components:{
        Test
    },
    methods:{
        childChange(args){
            console.log("Child : "+ args)
            this.msg = args
        }
    },
    updated(){
        console.log('Father updated')
    }
}
</script>
