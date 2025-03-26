<template>
  <div class="date-select">
    <input type="datetime-local" name="time" step=".1" v-model="dateTime" :key="dateTimeKey">
    <!-- <input type="date" value="2018-7-22"> -->
    <button @click.stop="cancel">取消</button>
    <button class="date-ok" @click.stop="ok">确认</button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ defaultValue: number }>(), {});
import { ref, onMounted } from "vue";
const dateTime = ref<string>('1970-01-01 08:00:00.000')
const dateTimeKey = ref(0)

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
  // console.log('时间戳转换为时间', formattedDate);
  return formattedDate
}
//时间转换为时间戳
const toTimetampTimes = (dateTime: string) => {
  const date = new Date(dateTime)
  const time = date.getTime()
  // console.log('时间转换为时间戳', time);
  return time
}
const emits = defineEmits(['ok', 'cancel']);

const cancel = () => {
  emits('cancel')
}
const ok = () => {
  // console.log('dateTime', dateTime.value);
  const time = toTimetampTimes(dateTime.value)
  emits('ok', time)
  emits('cancel')
}
onMounted(() => {
  dateTime.value = timestampToTime(props.defaultValue)
})
</script>

<style scoped>
.date-select {
  position: fixed;
  user-select: none;
  width: 350px;
  top: calc(50% - 150px);
  left: calc(50% - 150px);
  background: #fff;
  padding: 10px;
  z-index: 3;
  color: black;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.date-btn {
  display: flex;
}

button {
  width: 50px;
  height: 24px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #efefef;
  color: #000;
  border: none;
}

.date-ok {
  background-color: rgb(9, 132, 255) !important;
  color: #fff !important;
}
</style>
