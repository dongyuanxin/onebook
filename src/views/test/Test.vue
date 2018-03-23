<template>
    <div class="test" @click="changeMsg">
        <!-- {{ msg }} -->
    </div>
</template>
<script>
export default {
    data(){
        return {
            msg:'test'
        }
    },
    beforeMount(){
        console.log("before mount")
        // alert('debug `before mount`')
    },
    mounted(){
        console.log('mounted')
    },
    beforeUpdate(){
        console.log('beforeUpdate')
    },
    updated(){
        console.log('updated')
    },
    methods:{
        changeMsg(){
            this.msg = this.msg === 'test' ? 'ok' : 'test'
            this.$emit('childchange','From children: ' + this.msg)
        }
    }
}
</script>
<style>
    .test{
        height:100px;
        width:100px;
        cursor: pointer;
        margin:0 auto;
        background-color:mistyrose;
        border-radius: 5px;
    }
</style>

