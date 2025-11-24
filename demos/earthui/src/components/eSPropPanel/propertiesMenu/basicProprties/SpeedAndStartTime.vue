<template>
    <!-- 选择框 -->
    <PopList :title="'通过速度和起始时间设置时间序列'" :showButton="true" @ok="ok">
        <div class="roam_moveOnLineMode">
            <div>
                <label for="">速度:</label>
                <input type="number" class="input_number" v-model.number="speed" @input="oninput">m/s
            </div>
            <div>
                <label for="">起始时间:</label>
                <input type="datetime-local" name="time" step=".1" v-model="startTime">
            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESPath, geoDistance } from "earthsdk3";
import { onMounted, ref } from "vue";
import PopList from "../../../../components/PopList.vue";
import { timestampToTime, toTimetampTimes } from "./tool";
const p = withDefaults(defineProps<{ sceneObject?: ESPath }>(), {});
const { sceneObject } = p
const emits = defineEmits(['close'])
//速度
const speed = ref(1)
//开始时间
const startTime = ref()
const oninput = () => {
    if (speed.value < 0) {
        speed.value = 1
    }
}
const ok = () => {
    const time = toTimetampTimes(startTime.value)
    let timeStamps = [time]
    if (sceneObject && sceneObject.points) {
        const points = sceneObject.points
        for (let i = 0; i < points.length - 1; i++) {
            const distance = geoDistance(points[i], points[i + 1])
            const time = (distance / speed.value * 1000) + timeStamps[i]
            timeStamps.push(Number((time).toFixed(0)))
        }
        sceneObject.timeStamps = timeStamps
        Message.success('设置时间序列成功')
        emits('close')
    }
}
onMounted(() => {
    //赋初始值
    if (sceneObject && sceneObject.timeStamps && sceneObject.timeStamps.length > 0) {
        startTime.value = timestampToTime(sceneObject.timeStamps[0])
    } else {
        let timestamp = new Date().getTime();
        startTime.value = timestampToTime(timestamp)
    }
})
</script>
<style scoped>
.roam_moveOnLineMode {
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.roam_moveOnLineMode>div {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 26px;
    color: rgba(230, 230, 230, 1);
    position: relative;
}

.roam_moveOnLineMode>div>label {
    display: inline-block;
    width: 70px;
    height: 26px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    text-align: left;
}

.roam_moveOnLineMode>div>input[type=number] {
    display: inline-block;
    width: 154px;
    height: 26px;
    background: rgba(28, 28, 29, 0.6);
    border-radius: 4px;
    border: 1px solid #3b3c40;
    margin-right: 0;
    color: rgba(230, 230, 230, 1);
    padding-left: 11px;
    box-sizing: border-box;
}

.roam_moveOnLineMode>div>input[type=datetime-local] {
    width: 190px;
    height: 26px;
    border: 1px solid #3B3C40;
    outline: none;
    background: rgba(28, 28, 29, 0.6);
    color: rgba(230, 230, 230, 1);
    border-radius: 4px;
}

.roam_moveOnLineMode>div>input:hover {
    border: 1px solid #2c68f7;
}

.input_number::-webkit-outer-spin-button,
.input_number::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.input_number[type="number"] {
    -moz-appearance: textfield;
}
</style>
