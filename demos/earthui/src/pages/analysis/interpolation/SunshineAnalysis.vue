<template>
    <!-- 选择框 -->
    <PopList :title="'日照分析'" :showButton="true" @close="restart" @ok="start" :leftButton="'重新绘制'"
        :rightButton="flag ? '开始分析' : '结束分析'" :showLeftButton="true">
        <div class="analysis_volume_top">
            <!-- <div class="row">
                <label for="">起始颜色</label>
                <div class="color">
                    <ESColor :color="startColorRef" @ok="startColorOk" :key="2"></ESColor>
                </div>
            </div>
            <div class="row">
                <label for="">结束颜色</label>
                <div class="color">
                    <ESColor :color="endColorRef" @ok="endColorOk" :key="2"></ESColor>
                </div>
            </div> -->
            <div class="row">
                <label for="">日照强度</label>
                <div class="color">
                    <!-- <ESColor :color="endColorRef" @ok="endColorOk" :key="2"></ESColor> -->
                </div>
            </div>
            <div class="row">
                <label for="">起始时间</label>
                <input class="analysis_volume_data" type="datetime-local" name="time" step=".1" v-model="startTimeRef"
                    @input="inputHandler1($event)">
            </div>
            <div class="row">
                <label for="">结束时间</label>
                <input class="analysis_volume_data" type="datetime-local" name="time" step=".1" v-model="stopTimeRef"
                    @input="inputHandler2($event)">
            </div>
        </div>
        <LabelInput v-model="extrudedHeight" :inputType="'number'" :label="'分析高度'" :unit="'m'"></LabelInput>
        <LabelInput v-model="height" :inputType="'number'" :label="'底面高度'" :unit="'m'"></LabelInput>
        <LabelInput v-model="spanTime" :inputType="'number'" :label="'间隔时间'" :unit="'h'"></LabelInput>
        <LabelInput v-model="sampleDistance" :inputType="'number'" :label="'采样间距'" :unit="'m'">
        </LabelInput>
        <LabelInput v-model="progress" :inputType="'number'" :label="'计算进度'" :unit="'%'" :readonly="true"></LabelInput>
    </PopList>
</template>
<script setup lang="ts">
import { ESColor, Message } from "earthsdk-ui";
import { computed, inject, onBeforeUnmount, onMounted, ref } from "vue";
import { createVueDisposer, toVR } from 'earthsdk-ui';
import LabelInput from "../../../components/LabelInput.vue";
import PopList from "../../../components/PopList.vue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
function dateToTimestamp(date: any) {//时间转为时间戳
    return date.getTime();
}
const a = new Date(new Date(new Date().toLocaleDateString()).getTime());
const b = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
let sunshineAnalysis = xbsjEarthUi.createSceneObject("ESSunshineAnalysis") as any;
// 计算进度
let progress = toVR<number>(d, [sunshineAnalysis, "progress"])
//分析高度
let extrudedHeight = toVR<number>(d, [sunshineAnalysis, "extrudedHeight"])
// // 底面高度：
let height = toVR<number>(d, [sunshineAnalysis, "height"])
// 开始时间：
let startTime = toVR<number>(d, [sunshineAnalysis, "startTime"])
startTime.value = dateToTimestamp(a)
// 结束时间：
let endTime = toVR<number>(d, [sunshineAnalysis, "endTime"])
endTime.value = dateToTimestamp(b)
// 间隔时间：
let spanTime = toVR<number>(d, [sunshineAnalysis, "spanTime"])
// 采样间距：
let sampleDistance = toVR<number>(d, [sunshineAnalysis, "sampleDistance"])
// 开始颜色：
let startColor = toVR<ColorType>(d, [sunshineAnalysis, "startColor"])
// 结束颜色：
let endColor = toVR<ColorType>(d, [sunshineAnalysis, "endColor"])
console.log(startColor, endColor);

const startTimeRef = computed(() => {
    return timestampToTime(startTime.value)
})
const stopTimeRef = computed(() => {
    return timestampToTime(endTime.value)
})
const inputHandler1 = (e: any) => {//更新开始时间
    startTime.value = toTimetampTimes(e.target.value)
}
const inputHandler2 = (e: any) => {//更新结束时间
    endTime.value = toTimetampTimes(e.target.value)
}
const startColorRef = computed(() => {
    if (startColor.value === undefined) {
        return {
            r: 255, g: 255, b: 255, a: 1
        }
    } else {
        return {
            r: startColor.value[0] * 255,
            g: startColor.value[1] * 255,
            b: startColor.value[2] * 255,
            a: startColor.value[3]
        }
    }
})
const endColorRef = computed(() => {
    if (endColor.value === undefined) {
        return {
            r: 255, g: 255, b: 255, a: 1
        }
    } else {
        return {
            r: endColor.value[0] * 255,
            g: endColor.value[1] * 255,
            b: endColor.value[2] * 255,
            a: endColor.value[3]
        }
    }
})
type ColorType = [number, number, number, number]
const startColorOk = (rgba: { r: number, g: number, b: number, a: number }) => {//更新起始颜色
    const rgbaArr: ColorType = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
    startColor.value = rgbaArr
}
const endColorOk = (rgba: { r: number, g: number, b: number, a: number }) => {//更新结束颜色
    const rgbaArr: ColorType = [rgba.r / 255, rgba.g / 255, rgba.b / 255, rgba.a]
    endColor.value = rgbaArr
}

const restart = () => {
    sunshineAnalysis.stop()
    sunshineAnalysis.points = undefined
    progress.value = 0
    sampleDistance.value = 0
    flag.value = true
    requestAnimationFrame(() => {
        sunshineAnalysis.editing = true
    });
    Message.warning('结束编辑之后请点击开始分析')
}
const flag = ref(true)//trueda
function isTimeFormat(str: string) {
    // 将字符串转换为日期对象
    var date = new Date(str);
    // 检查日期对象是否有效
    return !isNaN(date.getTime());
}
const start = () => {
    if (!isTimeFormat(startTimeRef.value) || !isTimeFormat(stopTimeRef.value)) {
        Message.warning('请填写开始时间和结束时间')
        return
    }
    if (flag.value) {
        if (sunshineAnalysis && sunshineAnalysis.editing) {
            Message.warning('请双击结束编辑之后进行分析')
            return
        }
        sunshineAnalysis.stop()
        sunshineAnalysis.start()
        flag.value = false
    } else {
        sunshineAnalysis.stop()
        flag.value = true
    }
}
const emits = defineEmits(['close'])
let dispose: any
let dispose2: any
onMounted(() => {
    if (sunshineAnalysis) {
        sunshineAnalysis.editing = true
        Message.warning('请绘制分析区域，双击结束编辑之后点击 开始分析')
    }
    dispose = sunshineAnalysis.editingChanged.disposableOn(() => {
        if (sunshineAnalysis.editing === false) {
            sampleDistance.value = Number((Math.sqrt(sunshineAnalysis.area / xbsjEarthUi.Interpolation2)).toFixed(2))
            if (sampleDistance.value < 10) {
                sampleDistance.value = 10
            }
            let a: number[] = []
            const points = sunshineAnalysis.points
            if (points.length > 1) {
                points.forEach((element: any) => {
                    a.push(element[2])
                });
                height.value = Number((Math.min(...a)).toFixed(5))
            }
        }
    })
    dispose2 = sunshineAnalysis.dispose(sunshineAnalysis.progressChanged.disposableOn((res: any) => {
        if (res === 100) {
            flag.value = true
        }
    }))

})
onBeforeUnmount(() => {
    if (sunshineAnalysis) {
        sunshineAnalysis.editing = false
        sunshineAnalysis.stop()
        xbsjEarthUi.destroySceneObject(sunshineAnalysis)
        sunshineAnalysis = undefined
    }
    if (dispose) {
        dispose()
        dispose = undefined
    }
    if (dispose2) {
        dispose2()
        dispose2 = undefined
    }
})
//时间戳转换为时间
const timestampToTime = (timestamp: number) => {
    const date = new Date(timestamp); // 根据时间戳创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份，需要加1
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒数
    const millisecond = date.getMilliseconds(); // 获取秒数
    const formattedDate = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day} ${hour.toString().length === 1 ? `0${hour}` : hour}:${minute.toString().length === 1 ? `0${minute}` : minute}:${second.toString().length === 1 ? `0${second}` : second}.${millisecond}`; // 拼接成格式化后的日期字符串
    return formattedDate
}
//时间转换为时间戳
const toTimetampTimes = (dateTime: string) => {
    const date = new Date(dateTime)
    const time = date.getTime()
    return time
}
</script>
