<template>
    <PopList :title="'默认'">
        <div class="interation_text">
            <p>鼠标左键&nbsp;&nbsp;&nbsp;&nbsp;平移</p>
            <p>鼠标右键&nbsp;&nbsp;&nbsp;&nbsp;旋转</p>
            <p>鼠标中键&nbsp;&nbsp;&nbsp;&nbsp;上下翻转</p>
            <p>鼠标滚轮&nbsp;&nbsp;&nbsp;&nbsp;缩放</p>
        </div>

        <div class="poplist_head">
            <div class="roam_custom_head_left"><span></span> 相机可运动范围（测试） </div>
        </div>
        <div>
            <LabelInputDefault v-model="west" :inputType="'number'" :min="0" :max="180" :label="'西经'" :unit="'°'"
                :defaultValue="0">
            </LabelInputDefault>
            <LabelInputDefault v-model="south" :inputType="'number'" :min="0" :max="90" :label="'南纬'" :unit="'°'"
                :defaultValue="0">
            </LabelInputDefault>
            <LabelInputDefault v-model="east" :inputType="'number'" :min="0" :max="180" :label="'东经'" :unit="'°'"
                :defaultValue="0">
            </LabelInputDefault>
            <LabelInputDefault v-model="north" :inputType="'number'" :min="0" :max="90" :label="'北纬'" :unit="'°'"
                :defaultValue="0">
            </LabelInputDefault>
            <LabelInputDefault v-model="minHeight" :inputType="'number'" :label="'最低高度'" :unit="'m'" :defaultValue="0">
            </LabelInputDefault>
            <LabelInputDefault v-model="maxHeight" :inputType="'number'" :label="'最高高度'" :unit="'m'" :defaultValue="0">
            </LabelInputDefault>
        </div>
    </PopList>


</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue';
import LabelInputDefault from "../../../components/LabelInputDefault.vue"
import { ref, onMounted, watch, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { ESViewer } from 'earthsdk3';
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const west = ref(0)//西经
const south = ref(0)//南纬
const east = ref(0)//东经
const north = ref(0)//北纬
const minHeight = ref(0)//最低高度
const maxHeight = ref(0)//最高高度
onMounted(() => {
    const defaults = ESViewer.defaults.cameraMovableRegion
    console.log('defaults', defaults);

    if (xbsjEarthUi.activeViewer?.cameraMovableRegion) {
        console.log(1111111111111);
        const cameraMovableRegion = xbsjEarthUi.activeViewer.cameraMovableRegion
        west.value = cameraMovableRegion[0] ?? defaults[0]
        south.value = cameraMovableRegion[1] ?? defaults[1]
        east.value = cameraMovableRegion[2] ?? defaults[2]
        north.value = cameraMovableRegion[3] ?? defaults[3]
        minHeight.value = cameraMovableRegion[4] ?? defaults[4]
        maxHeight.value = cameraMovableRegion[5] ?? defaults[5]
    } else {
        console.log(22222222222);

        west.value = defaults[0]
        south.value = defaults[1]
        east.value = defaults[2]
        north.value = defaults[3]
        minHeight.value = defaults[4]
        maxHeight.value = defaults[5]
    }
})
watch([west, south, east, north, minHeight, maxHeight], () => {
    if (!xbsjEarthUi.activeViewer) return
    xbsjEarthUi.activeViewer.cameraMovableRegion = [west.value, south.value, east.value, north.value, minHeight.value, maxHeight.value]
})
</script>
<style scoped>
.poplist_head {
    width: 100%;
    height: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    border-bottom: 1px solid rgba(183, 183, 183, 0.5);
    font-size: 12px;
}

.roam_custom_head_left {
    position: relative;
    color: #fff;
    user-select: none;
}

.roam_custom_head_left>span {
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 1px;
    background: #fff;

}
</style>
