<template>
    <div class="newTime">
        <div class="newTime_left"></div>
        <div class="newTime_right" @wheel="wheel" @pointerdown="pointerdown" @pointerup="pointerup"
            @pointermove="pointermove" @pointerover="pointerover" @pointerout="pointerout">
            <!-- 线部分 -->
            <div class="newTime_right_topline">
                <div class="newTime_right_topline_edit"></div>
                <div class="newTime_timelist_line">
                    <div v-for="(item, index) in playerScaleList" :style="{ width: `${1 / 12 * 100}%` }"
                        class="scale_bigItem">
                        <div v-for="(ite) in playerScaleListItem" :style="{ width: `${1 / 10 * 100}%` }" :key="ite.id"
                            class="scale_item">
                        </div>
                        <span v-if="index % 2 === 0 && index !== 0" class="scale_number">{{ timestampToTime(item.value,
                            true)
                            }}</span>
                    </div>
                </div>
            </div>
            <!-- 列表部分 -->
            <div class="newTime_right_bottomlist">
                <div class="newTime_right_bottomlist_info"></div>
                <div class="newTime_timelist_channels">


                    <div class="newTime_currenttime" name="currentTime"
                        :style="{ left: `calc( ${(currentTime - playerStarttimeAxis) / totaltimeAxis * 100}% - 1px )` }">
                    </div>
                </div>

            </div>
            <div v-show="textInfo.show"
                style="pointer-events: none; font-size: 12px; background: rgba(0, 0, 0, .8); color: rgba(255, 255, 255, .8); padding: 3px 5px 3px 5px; border-radius: 3px; white-space: nowrap;"
                :style="{ position: 'absolute', left: `${textInfo.x}px`, top: `${textInfo.y}px`, }">
                {{ textInfo.text }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, inject, computed, onBeforeUnmount, reactive, watch } from "vue"
import { createVueDisposer, toVR } from 'earthsdk-ui';
import { XbsjEarthUi } from "../../../../scripts/xbsjEarthUi";
import { timestampToTime } from "../../../../components/eSPropPanel/propertiesMenu/basicProprties/tool";
import { Dragger,CurrentTimeLineDragger } from "./playerEditorTools"
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const d = createVueDisposer(onBeforeUnmount);
//播放器的属性
const startTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, "startTime"])//播放器的开始时间
const stopTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, "stopTime"])//播放器的结束时间
const channels = toVR<{ pathId: string, sceneObjectIds: string[] }[]>(d, [xbsjEarthUi.pathAnimationManager, "channels"])//动画的列表
const currentTime = toVR<number>(d, [xbsjEarthUi.pathAnimationManager.player, "currentTime"])//播放器的当前时间

const playerStoptimeAxis = ref(86400000)//时间轴的结束时间
const playerStarttimeAxis = ref(0)//时间轴的开始时间
/////////////// 获取今天的开始时间戳，初始化时间轴
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);
const startTimestamp = startOfToday.getTime();//今天的起始时间
playerStarttimeAxis.value = startTimestamp//初始化时间轴的开始时间
const textInfo = reactive({ x: 0, y: 0, show: false, text: '' });//划过时间的信息
setTimeout(() => {
    currentTime.value = startTimestamp + 8640000//初始化播放器的当前 
}, 100)
playerStoptimeAxis.value = playerStarttimeAxis.value + 86400000//初始化时间轴的结束时间
const totaltimeAxis = computed(() => {//时间轴的长度
    return (playerStoptimeAxis.value - playerStarttimeAxis.value)
})
const xScale = ref(1)//线段的间隔比例
const playerScaleList = computed(() => {
    const list = []
    for (let i = 0; i < 12; i++) {
        const value = Math.round(totaltimeAxis.value / 12)
        const item = {
            id: getUuid(),
            value: value * i + playerStarttimeAxis.value
        }
        list.push(item)
    }
    return list
})
const playerScaleListItem = computed(() => {//小时间线的间隔
    const list = []
    for (let i = 0; i < 10; i += 1) {
        const item = {
            id: getUuid(),
            value: i
        }
        list.push(item)
    }
    return list
})

const wheel = (event: WheelEvent) => {
    const w = event.deltaY / -100;

    console.log(w);

}
const pointerdown = (event: PointerEvent) => {
    if (!event.target) {
        return
    }
    resetCurrentDragger();
    const dom = event.target as HTMLElement;
    const name = dom.getAttribute('name');
    if (!name) {
        return
    }
    console.log('name', name);
    if (name === 'currentTimeLine') {
        currentDragger = new CurrentTimeLineDragger(event, currentTime);
    }
}
const pointerup = (event: PointerEvent) => {

}
const pointermove = (event: PointerEvent) => {

}
const pointerover = (event: PointerEvent) => {

}
const pointerout = () => {

}
let currentDragger: Dragger | undefined = undefined;

const resetCurrentDragger = () => {
    if (currentDragger) {
        currentDragger.destroy();
        currentDragger = undefined;
    }
}
function getUuid() {//创建随机id
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
</script>
<style>
.newTime {
    width: 100%;
    height: 146px;
    position: fixed;
    bottom: 30px;
    left: 0;
    display: flex;
}

.newTime_left {
    width: 130px;
    height: 100%;
    border-right: 1px solid rgba(151, 151, 151, 0.2);
    box-sizing: border-box;
    padding: 0 5px;
    background: rgba(37, 38, 42, 0.98);
}

.newTime_right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}

.newTime_right_topline {
    width: 100%;
    height: 36px;
    display: flex;
    background: rgba(37, 38, 42, 0.98);
    border-bottom: 1px solid rgba(151, 151, 151, 0.8);
    box-sizing: border-box;
}

.newTime_right_topline_edit {
    width: 104px;
    height: 100%;
    border-right: 1px solid rgba(151, 151, 151, 0.2);
    box-sizing: border-box;
}

.newTime_timelist_line {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.newTime_right_bottomlist {
    flex: 1;
    display: flex;


}

.newTime_right_bottomlist_info {
    width: 104px;
    height: 100%;
    background: rgba(37, 38, 42, 0.98);
    border-right: 1px solid rgba(151, 151, 151, 0.2);
    box-sizing: border-box;
}

.newTime_timelist_channels {
    flex: 1;
    width: 100%;
    background: rgba(37, 38, 42, 0.9);
    position: relative;
}

.newTime_currenttime {
    position: absolute;
    height: 100%;
    width: 2px;
    top: 0;
    background: rgba(44, 104, 247, 1);
    cursor: pointer;
}

.scale_bigItem {
    height: 10px;
    width: 80px;
    border-left: 1px solid rgba(183, 183, 183, 1);
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-top: 24px;
}

.scale_item {
    height: 6px;
    width: 8px;
    border-left: 1px solid rgba(183, 183, 183, 1);
    box-sizing: border-box;
}

.scale_bigItem>.scale_item:nth-child(1) {
    border: none !important;
}

.scale_number {
    position: absolute;
    left: -55px;
    top: -18px;
    font-size: 12px;
    color: rgba(230, 230, 230, 1);
    white-space: nowrap;
}
</style>