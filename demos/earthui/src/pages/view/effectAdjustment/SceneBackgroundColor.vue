<template>
    <PopList :title="'场景背景颜色'">
        <div class="roam_pick" style="margin-top: 10px;">
            <label>颜色</label>
            <div style="width: 190px;">
                <ESColor :color="sceneBackgroundColorValue" @ok="okContourColor" />
            </div>
        </div>
    </PopList>

</template>
<script setup lang="ts">
import { createVueDisposer, toVR } from 'earthsdk-ui';
import PopList from "../../../components/PopList.vue";
import { onBeforeUnmount, inject, ref, watch } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { ESColor } from "earthsdk-ui";

const d = createVueDisposer(onBeforeUnmount);
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneBackgroundColor = toVR<[number, number, number, number]>(d, [xbsjEarthUi.activeViewer, 'sceneBackgroundColor']);//场景背景颜色
const sceneBackgroundColorValue = ref({ r: 0, g: 0, b: 0, a: 0 });
// 监听等高线颜色变化，转换为 ESColor 组件需要的格式
watch(sceneBackgroundColor, (val) => {
    if (val) {
        sceneBackgroundColorValue.value = {
            r: Math.round(val[0] * 255),
            g: Math.round(val[1] * 255),
            b: Math.round(val[2] * 255),
            a: val[3]
        };
    }
}, { immediate: true });
const okContourColor = (rgba: { r: number, g: number, b: number, a: number }) => {
    sceneBackgroundColor.value = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a];
}
</script>