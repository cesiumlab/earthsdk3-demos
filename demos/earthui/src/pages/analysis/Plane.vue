<script setup lang='ts'>
import { ref } from "vue";
import Intersect from "./plane/Intersect.vue"
import Merge from "./plane/Merge.vue";
import Buffer from "./plane/Buffer.vue";
import Difference from "./plane/Difference.vue";
import RightList from "../../components/RightList.vue";
import Button from "../../components/Button.vue";
const controlList1: { type: string, zh: string, icon: string, leftButton: boolean }[] = [
    {
        type: 'intersect',
        zh: '交',
        icon: 'jiao',
        leftButton: true
    },
    {
        type: 'merge',
        zh: '并',
        icon: 'bing',
        leftButton: false
    },
    {
        type: 'buffer',
        zh: '缓冲',
        icon: 'huanchong',
        leftButton: true
    }
    ,
    {
        type: 'difference',
        zh: '计算差异',
        icon: 'tuxingjisuan',
        leftButton: false
    }
];
const emits = defineEmits(['closeObj'])

const objType = ref<string>('')
const close = (type: string) => {
    emits('closeObj')
    setTimeout(() => {
        if (objType.value === type) {
            objType.value = ''
        } else {
            objType.value = type
        }
    }, 50)


}
</script>
<template>
    <RightList :title="'平面几何'">
        <Button v-for="item in controlList1" :name="item.icon" :content="item.zh" :click="() => { close(item.type) }"
            :actived="objType === item.type" :left-button="item.leftButton"></Button>
        <Intersect v-if="objType === 'intersect'" @close="objType = ''"></Intersect>
        <Merge v-if="objType === 'merge'" @close="objType = ''"></Merge>
        <Buffer v-if="objType === 'buffer'" @close="objType = ''"></Buffer>
        <Difference v-if="objType === 'difference'" @close="objType = ''"></Difference>
    </RightList>
</template>
