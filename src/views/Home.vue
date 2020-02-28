<template>
    <div>
        首页diyige 
        <input type="text">
        <i-button type="info" @click="test">测试按钮</i-button>
    </div>
</template>

<script>
import {v_axios} from '../utils'
export default {
    name: 'home',
     data() {
         return{
         }
     },
     methods:{
             test(){
                 v_axios('/api/setKV','post',{},"")
             }
         }
}
</script>

<style scoped>

</style>