<script setup lang='ts'>
import { ref } from 'vue';
import DateSelect from '../../DateSelect.vue'
withDefaults(defineProps<{
    modelValue?: number,
    withUndefined?: boolean,
    defaultValue?: number,
    readonly?: boolean,
    propertyName?: string
}>(), { withUndefined: true, readonly: false, propertyName: '属性值' })

const dateShow = ref(false)
const emits = defineEmits(["update:modelValue"]);
const timers = ref<NodeJS.Timeout>()
const ok = (date: number) => {
    clearTimeout(timers.value)
    timers.value = setTimeout(() => {
        emits('update:modelValue', date)
    }, 200);
}
const cancel = () => {
    dateShow.value = false
}
const openSetDate = () => {
    dateShow.value = true
}
const toNumber = (defaultValue: number | undefined) => {
    const num = defaultValue ?? new Date().getTime() * 1000
    emits('update:modelValue', num)
}
const toUndefined = () => {
    emits('update:modelValue', undefined)
}
//时间戳转换为时间
const timestampToTime = (timestamp: number) => {
    const date = new Date(timestamp); // 根据时间戳创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份，需要加1
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒数
    const millisecond = date.getMilliseconds(); // 获取毫秒数
    const formattedDate = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day} ${hour.toString().length === 1 ? `0${hour}` : hour}:${minute.toString().length === 1 ? `0${minute}` : minute}:${second.toString().length === 1 ? `0${second}` : second}.${millisecond}`; // 拼接成格式化后的日期字符串
    // const formattedDate = `${year}-${month}-${day}`; // 拼接成格式化后的日期字符串
    // console.log('时间戳转换为时间', formattedDate);
    return formattedDate
}
</script>

<template>
    <div class="readonly_flag" :class="{ 'readonly_true': readonly }">
        <div v-if="modelValue === undefined">
            <span>未设置</span><span class="undefined_settting" @click="toNumber(defaultValue)"
                :title="`设置${propertyName}`">⚙</span>
        </div>
        <div v-if="(modelValue !== undefined)" class="date-change" @click="openSetDate">
            <span>{{ timestampToTime(modelValue) }}</span>
            <DateSelect v-if="dateShow" @ok="ok" @cancel="cancel" :defaultValue="modelValue"></DateSelect>
        </div>

        <span v-if="withUndefined && (modelValue !== undefined)" class="undefined_settting" @click="toUndefined()"
            title="设为undefined">╳</span>
    </div>
</template>

<style scoped>
.undefined_settting {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
    border-radius: 3px;
    text-align: center;
}

.undefined_settting:hover {
    background-color: #383838;
}

.readonly_flag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.readonly_true {
    pointer-events: none;
    user-select: none;
}

.date-change {
    display: flex;
    background-color: #065164;
    color: #fff;
    border: 1px solid #00212b;
    height: 20px;
    font-size: 12px;
    flex: 1;
    line-height: 18px;
    background-image: url(../../../img/time.png);
    background-size: 16px 16px;
    background-repeat: no-repeat;
    padding: 1px 0px 1px 20px;
    box-sizing: border-box;
}

.date-change:hover {
    background-image: url(../../../img/time_hover.png);
}
</style>
