<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, inject } from "vue";
import SkylineAnalysis from './spatial/SkylineAnalysis.vue'; //表面积组件
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
export default defineComponent({
    components: {
        SkylineAnalysis,
    }
})
</script>
<script setup lang='ts'>
import { createVueDisposer, toVR } from "earthsdk-ui";
import RightList from '../../components/RightList.vue';
import Button from '../../components/Button.vue';
const disposer = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const ueIsShow = toVR<boolean>(disposer, [xbsjEarthUi, 'ueIsShow'])
const rollerShutter = toVR<boolean>(disposer, [xbsjEarthUi.activeViewer, 'rollerShutter'])
const controlList: { zh: string, type: string, icon: string, leftButton: boolean, hiddenFromUE?: boolean }[] = [
    {
        type: 'SkylineAnalysis',
        zh: '天际线',
        icon: 'tiji',
        leftButton: true,
        hiddenFromUE: true
    }

];
const type = ref('')
const changeType = (value: string) => {
    type.value = type.value === value ? '' : value
}
const emits = defineEmits(['closeObj'])
</script>

<template>
    <RightList :title="'空间分析2'" v-show="!ueIsShow">
        <Button v-show="!ueIsShow || !item.hiddenFromUE" v-for="item in controlList" :name="item.icon"
            :content="item.zh" :click="() => { changeType(item.type) }" :actived="type === item.type"
            :left-button="item.leftButton"></Button>
        <Button v-show="!ueIsShow " :name="'jiancai'"
            :content="'卷帘分割'" :click="() => { rollerShutter=!rollerShutter }" :actived="rollerShutter"
            :left-button="false"></Button>
        <component :is="type" />
    </RightList>
</template>

<style scoped>
.control-list {
    display: flex;
    flex-direction: column;
}
</style>