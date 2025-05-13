<script setup lang='ts'>
import Button from '../../components/Button.vue';
import RightList from '../../components/RightList.vue';
import { ref, inject, onBeforeUnmount, onMounted, computed } from 'vue';
import { annotationObjectList, effectObjectList, parkObjectList, ueObjectList, vectorObjectList } from './data';
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import { createVueDisposer, toVR } from 'earthsdk-ui';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
const ueIsShow = toVR<boolean>(d, [xbsjEarthUi, 'ueIsShow'])
const objType = ref<string>('')
const largeScreen = ref(true)
onMounted(() => {
    //@ts-ignore
    if (window.ue && window.ue.es) {
        largeScreen.value = false
    }
})
const vectorCom = computed(() => {
    return vectorObjectList.find(item => item.type === objType.value)?.com.value
})
const annotationCom = computed(() => {
    return annotationObjectList.find(item => item.type === objType.value)?.com.value
})
const parkCom = computed(() => {
    return parkObjectList.find(item => item.type === objType.value)?.com.value
})
const effectCom = computed(() => {
    return effectObjectList.find(item => item.type === objType.value)?.com.value
})
const ueCom = computed(() => {
    return ueObjectList.find(item => item.type === objType.value)?.com.value
})


// 使用示例



const scrollDownAndClick = (item: any) => {
    objType.value === item.type ? objType.value = '' : objType.value = item.type
    var div = document.getElementById('submenu_component');
    setTimeout(() => {
        if (div) {
            div.scrollTop = 300; // 设置scrollTop值
        }
    }, 300)
}
const scrollDownAndClick2 = (item: any) => {
    objType.value === item.type ? objType.value = '' : objType.value = item.type
    var div = document.getElementById('submenu_component');
    setTimeout(() => {
        if (div) {
            div.scrollTop = 420; // 设置scrollTop值
        }
    }, 300)
}
</script>
<template>
    <RightList :title="'矢量'" :isTop="true">
        <Button v-for="item in vectorObjectList" :name="item.icon" :content="item.zh"
            :click="() => { objType === item.type ? objType = '' : objType = item.type }"
            :actived="objType === item.type" :left-button="item.leftButton"></Button>
        <!-- 所有全都参照修改 todo 秦瑛 -->
        <component :is="vectorCom" @close="objType = ''"></component>

    </RightList>
    <RightList :title="'注记'">
        <Button v-for="item in annotationObjectList" :name="item.icon" :content="item.zh"
            :click="() => { objType === item.type ? objType = '' : objType = item.type }"
            :actived="objType === item.type" :left-button="item.leftButton"></Button>
        <component :is="annotationCom" @close="objType = ''"></component>
    </RightList>
    <RightList :title="'园区'">
        <Button v-for="item in parkObjectList" :name="item.icon" :content="item.zh"
            :click="() => { objType === item.type ? objType = '' : objType = item.type }"
            :actived="objType === item.type" :left-button="item.leftButton"></Button>
        <component :is="parkCom" @close="objType = ''"></component>


    </RightList>
    <RightList :title="'特效'">
        <Button v-for="item in effectObjectList" :name="item.icon" :content="item.zh"
            :click="() => scrollDownAndClick(item)" :actived="objType === item.type"
            :left-button="item.leftButton"></Button>
        <component :is="effectCom" @close="objType = ''"></component>
    </RightList>
    <RightList :title="'ue引擎'" v-if="ueIsShow">
        <Button v-for="item in ueObjectList" :name="item.icon" :content="item.zh"
            :click="() => scrollDownAndClick2(item)" :actived="objType === item.type"
            :left-button="item.leftButton" :font-size="item.fontSize"></Button>
        <component :is="ueCom" @close="objType = ''"></component>
    </RightList>
</template>
