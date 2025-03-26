<script setup lang='ts'>
import Button from "../../components/Button.vue";
import RightList from "../../components/RightList.vue";
import { ref } from "vue";
import Height from "./liftingHeight/Height.vue"
const type = ref(false)
</script>

<template>
    <RightList :title="'抬升高度'" :isTop="true">
        <Button  :name="'taishenggaodu'" :content="'抬升高度'"
            :click="() => { type=!type }" :left-button="true"
            :actived="type"></Button>
            <Height v-if="type" @close="type=false"></Height>
    </RightList>
</template>
