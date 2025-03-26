<template>
  <div class="switch" @click="toggleSwitch(booleanValue, index)" @mousedown="isElongate = true"
    @mouseup="isElongate = false" :class="booleanValue ? 'switch-on-bg' : 'switch-off-bg'">
    <span class="switch_icon" :class="booleanValue ? ['switch-on', iconClass()] : ['switch-off', iconClass()]"></span>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{ booleanValue: boolean, index?: number }>()
const emits = defineEmits(["update:booleanValue"]);

const isElongate = ref(false)

const iconClass = () => {
  return isElongate.value ? 'elongate_icon' : ''
}

const toggleSwitch = (flag: boolean, index?: number) => {
  if (index !== undefined) {
    emits("update:booleanValue", { "flag": !flag, "index": index });
  } else {
    emits("update:booleanValue", !flag);
  }
};
</script>
<style scoped>
.switch {
  position: relative;
  border-radius: 10px;
  width: 40px;
  height: 16px;
  transition: background 0.5s;
  border: 1px solid #fff;
}

.switch:hover {
  border: 1px solid #64bd63;
}

.switch-off-bg {
  background: #fff;
}

.switch-on-bg {
  background: #64bd63;
}

.switch_icon {
  position: absolute;
  top: 2px;
  width: 10px;
  transition: width 0.1s;
  height: 10px;
  border-radius: 6px;
  border: 1px solid #64bd63;
  box-shadow: 0 1px 1px #ccc;
}

.switch-off {
  left: 2px;
  background: #000;
}

.switch-on {
  right: 2px;
  background: #fff;
}

.elongate_icon {
  width: 12px !important;
}
</style>
