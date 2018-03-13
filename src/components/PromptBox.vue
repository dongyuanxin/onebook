<template>
    <div class="prompt-box">
        <slot name="info"></slot>
        <slot name="button"></slot>
    </div>
</template>
<script>
export default {
    data(){
        return {}
    }
}
</script>
<style>
    .prompt-box{
        width:300px;
        height:200px;
        padding:5px;
        border-radius: 10px;
    }
</style>

