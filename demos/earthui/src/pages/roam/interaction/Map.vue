<template>
    <PopList :title="'默认'">
        <div class="interation_text">
            <p>鼠标左键&nbsp;&nbsp;&nbsp;&nbsp;平移</p>
            <p>鼠标右键&nbsp;&nbsp;&nbsp;&nbsp;旋转</p>
            <p>鼠标中键&nbsp;&nbsp;&nbsp;&nbsp;上下翻转</p>
            <p>鼠标滚轮&nbsp;&nbsp;&nbsp;&nbsp;缩放</p>
        </div>

        <div class="poplist_head">
            <div class="roam_custom_head_left"><span></span> 地理坐标包围盒（测试） </div>
        </div>
        <div>
            <LabelInputDefault v-model="west" :inputType="'number'" :min="0" :max="180" :label="'西经'" :unit="'°'">
            </LabelInputDefault>
            <LabelInputDefault v-model="south" :inputType="'number'" :min="0" :max="90" :label="'南纬'" :unit="'°'">
            </LabelInputDefault>
            <LabelInputDefault v-model="east" :inputType="'number'" :min="0" :max="180" :label="'东经'" :unit="'°'">
            </LabelInputDefault>
            <LabelInputDefault v-model="north" :inputType="'number'" :min="0" :max="90" :label="'北纬'" :unit="'°'">
            </LabelInputDefault>
            <LabelInputDefault v-model="minHeight" :inputType="'number'" :label="'最低高度'" :unit="'m'">
            </LabelInputDefault>
            <LabelInputDefault v-model="maxHeight" :inputType="'number'" :label="'最高高度'" :unit="'m'">
            </LabelInputDefault>
        </div>
    </PopList>


</template>
<script setup lang="ts">
import PopList from '../../../components/PopList.vue';
import LabelInputDefault from "../../../components/LabelInputDefault.vue"
import { ref, onMounted, watch, inject } from "vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const west = ref()//西经
const south = ref()//南纬
const east = ref()//东经
const north = ref()//北纬
const minHeight = ref()//最低高度
const maxHeight = ref()//最高高度
onMounted(() => {
    if (xbsjEarthUi.activeViewer?.cameraMovableRegion) {
        const cameraMovableRegion = xbsjEarthUi.activeViewer.cameraMovableRegion
        west.value = cameraMovableRegion[0]
        south.value = cameraMovableRegion[1]
        east.value = cameraMovableRegion[2]
        north.value = cameraMovableRegion[3]
        minHeight.value = cameraMovableRegion[4]
        maxHeight.value = cameraMovableRegion[5]
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
