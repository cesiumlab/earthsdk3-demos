<template>
    <PopList :title="'天际线分析'" :showButton="false">
        <LabelInput v-model="radius" :inputType="'number'" :label="'分析半径'" :unit="'m'">
        </LabelInput>
        <button @click="start">开始分析</button>
        <button @click="clear">清空分析</button>
    </PopList>

</template>
<script setup lang="ts">
import { ESSkylineAnalysis } from "earthsdk3";
import { inject, onBeforeUnmount, onMounted, } from "vue";
import LabelInput from "../../../components/LabelInput.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { createVueDisposer, toVR } from 'earthsdk-ui';
import PopList from "../../../components/PopList.vue";
// 分发事件
const emits = defineEmits(['close'])
// 销毁函数
const d = createVueDisposer(onBeforeUnmount);
// 对象管理器
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
// 天际线分析对象
let skylineAnalysis = xbsjEarthUi.createSceneObject(ESSkylineAnalysis) as any;
skylineAnalysis.radius = 1000
// 销毁函数
let dispose: any
// 深度值
let depths = toVR<number>(d, [skylineAnalysis, "depths"])
// 半径
let radius = toVR<number>(d, [skylineAnalysis, "radius"])

/**
 * 开始分析
 */
const start = () => {
    skylineAnalysis.start()
}
/**
 * 清空分析
 */
const clear = () => {
    skylineAnalysis.clear()
}

onMounted(() => {
    console.log("天际线", skylineAnalysis);
})
onBeforeUnmount(() => {
    if (skylineAnalysis) {
        xbsjEarthUi.destroySceneObject(skylineAnalysis)
        skylineAnalysis = undefined
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
})
</script>

<style scoped>
button {
    width: 80px;
    height: 32px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    cursor: pointer;
    color: rgba(230, 230, 230, 1);
    box-sizing: border-box;
    margin-right: 5px;
}

button:hover {
    border: 1px solid rgba(44, 104, 247, 1);
}
</style>
