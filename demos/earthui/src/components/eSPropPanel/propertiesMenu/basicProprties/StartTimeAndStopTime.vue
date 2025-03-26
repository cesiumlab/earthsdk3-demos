<template>
    <!-- 选择框 -->
    <PopList :title="'通过起始时间和结束时间设置时间序列'" :showButton="true" @ok="ok">
        <div class="roam_moveOnLineMode">
            <div>
                <label for="">开始时间:</label>
                <input type="datetime-local" name="time" step=".1" v-model="startTime">
            </div>
            <div>
                <label for="">结束时间:</label>
                <input type="datetime-local" name="time" step=".1" v-model="stopTime">
            </div>
        </div>
    </PopList>
</template>
<script setup lang="ts">
import { Message } from "earthsdk-ui";
import { ESPath, geoDistance } from "earthsdk3";
import { onMounted, ref } from "vue";
import PopList from "../../../../components/PopList.vue";
import { perimeterFromPoints, timestampToTime, toTimetampTimes } from "./tool";
const p = withDefaults(defineProps<{ sceneObject?: ESPath }>(), {});
const { sceneObject } = p
const startTime = ref()
const stopTime = ref()
const emits=defineEmits(['close'])

const ok = () => {
    const start = toTimetampTimes(startTime.value)
    const stop = toTimetampTimes(stopTime.value)
    const time = (stop - start) / 1000
    if (time < 0) {
        Message.warning('结束时间请大于开始时间')
        return
    }
    let timeStamps = []
    if (sceneObject && sceneObject.points) {
        const distance = perimeterFromPoints(sceneObject.points)
        const speed = distance / time
        const points = sceneObject.points
        if (points.length < 2) {
            timeStamps = [start, stop]
        } else {
            timeStamps = [start]
            for (let i = 0; i < points.length - 1; i++) {
                const distance = geoDistance(points[i], points[i + 1])
                const time = (distance / speed * 1000) + timeStamps[i]
                timeStamps.push(Number((time).toFixed(0)))
            }
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
        stopTime.value = timestampToTime(sceneObject.timeStamps[sceneObject.timeStamps.length - 1])
    } else {
        let timestamp = new Date().getTime();
        startTime.value = timestampToTime(timestamp)
        stopTime.value = timestampToTime(timestamp)
    }
})
</script>
<style scoped>
.roam_moveOnLineMode {
    width: 250px;
    box-sizing: border-box;
    position: relative;
}

.roam_moveOnLineMode>div {
    width: 250px;
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
</style>
