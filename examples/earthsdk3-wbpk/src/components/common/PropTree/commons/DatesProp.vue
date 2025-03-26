<script setup lang='ts'>
import { ref } from 'vue'
import Window from "../../Window.vue";
const props = withDefaults(defineProps<{
    modelValue?: number[],
    withUndefined?: boolean,
    defaultValue?: number[],
    readonly?: boolean,
    propertyName?: string
}>(), { withUndefined: true, propertyName: '属性值', readonly: false })


const emits = defineEmits(["update:modelValue"]);

const numbersRef = ref()
const viewsShow = ref(false);
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
//时间戳数组转换为时间
const timestampToTimeArray = (arr: number[]) => {
    return arr.map(item => {
        return timestampToTime(item)
    })
}
//时间数组转换为时间戳
const toTimetampTimesArray = (arr: string[]) => {
    return arr.map(item => {
        return toTimetampTimes(item)
    })
}

const toTheNumber = () => {
    if (props.modelValue === undefined) {
        const arr = JSON.parse(JSON.stringify(props.defaultValue ?? [])) as number[]
        numbersRef.value = timestampToTimeArray(arr)
    } else {
        const arr = JSON.parse(JSON.stringify(props.modelValue)) as number[]
        numbersRef.value = timestampToTimeArray(arr)
    }
    viewsShow.value = true
}

const addNumber = () => {
    numbersRef.value.push(timestampToTime(0))
}
const deleteNumber = (index: number) => {
    numbersRef.value.splice(index, 1)
}

const inputHandler = (e: any, index: number) => {
    if (!numbersRef.value) return
    const numsArr = JSON.parse(JSON.stringify(numbersRef.value))
    numsArr[index] = e.target.value
    numbersRef.value = numsArr
}

const cancel = () => {
    viewsShow.value = false
    return
}
const ok = () => {
    const numsArr = JSON.parse(JSON.stringify(numbersRef.value))
    const newNumsArr = toTimetampTimesArray(numsArr)
    emits('update:modelValue', newNumsArr)
    viewsShow.value = false
}

</script>

<template>
    <div class="prop_box">
        <div class="prop_edit">
            <span class="is_undefined"> {{ (modelValue === undefined) ? '未设置' : '' }}</span>
            <span class="set_btn" @click.stop="toTheNumber" :title="`${readonly ? '查看' : '设置'}${propertyName}`">⚙</span>
        </div>
        <span v-if="withUndefined && (modelValue !== undefined) && !readonly" class="set_btn"
            @click="emits('update:modelValue', undefined)" title="设为undefined">╳</span>
    </div>
    <Window :show="viewsShow" :title="propertyName" :onlyButton="false" :readonly="readonly" :width="600" :height="400"
        :isFocus="true" @cancel="cancel" @ok="ok">
        <div class="prop_list" :class="{ 'readonly_style': readonly }">
            <div class="value_box">
                <span class="set_btn" @click="addNumber()" title="添加" :class="{ 'readonly_true': readonly }">+</span>
            </div>
            <div class="value_box" v-for="(_, index) in numbersRef" :key="index">
                <!-- <input type="datetime-local" name="time" step=".1" :disabled="readonly" v-model="numbersRef[index]"
                    @input="inputHandler($event, index)"> -->
                <input type="datetime-local" name="time" step=".1" :disabled="readonly" v-model="numbersRef[index]"
                    @input="inputHandler($event, index)">
                <span class="set_btn" @click="deleteNumber(index)" title="删除"
                    :class="{ 'readonly_true': readonly }">╳</span>
            </div>
        </div>
    </Window>
</template>

<style scoped>
.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.prop_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}


.prop_edit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

.prop_list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}


.value_box {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    margin: 5px 0px;
    align-items: center;
}

.value_box>input {
    width: 90%;
    height: 20px;
    background: #065164;
    color: #fff;
    border: 1px solid #00212b;
    font-size: 12px;
    margin-right: 1px;
    padding: 0 10px;
}

.set_btn {
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 22px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
}

.is_undefined {
    font-size: 12px;
    text-align: center;
}

.set_btn:hover {
    background-color: #383838;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}

.readonly_style {
    cursor: not-allowed;
    cursor: no-drop;
    user-select: none;
}
</style>
