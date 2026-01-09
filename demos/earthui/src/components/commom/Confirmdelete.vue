<template>
  <div class="xbsj-modal-mask">
    <div class="confirm-delete">
      <div class="modal-header">
        <span>{{ title }}</span>
        <span @click="close" style="cursor: pointer">x</span>
      </div>
      <div class="modal-middle">
        {{ content }}
      </div>
      <div class="modal-footer">
        <button @click="close">取消</button>
        <button @click="leftButtonFnc" v-if="leftButton">
          {{ leftButton }}
        </button>
        <button class="determine" @click="rightButtonFnc">
          {{ rightButton }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    content?: string
    leftButton?: string
    rightButton?: string
  }>(),
  {
    title: '提示',
    content: '确认删除图层?',
    rightButton: '确认'
  }
)
const emits = defineEmits(['close', 'leftButtonFnc', 'rightButtonFnc'])
const close = () => {
  emits('close')
}
const leftButtonFnc = () => {
  emits('leftButtonFnc')
}
const rightButtonFnc = () => {
  emits('rightButtonFnc')
}
</script>
<style scoped>
.xbsj-modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  z-index: 3000000001;
}

.confirm-delete {
  position: absolute;
  background: #2c2c2c;
  width: 400px;
  top: 50%;
  left: 50%;
  border-radius: 3px;
  transform: translate(-50%, -50%);
  height: auto;
}

.modal-header {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 4px solid rgba(0, 0, 0, 0.4);
  color: #ddd;
  font-size: 14px;
}

.modal-middle {
  position: relative;
  padding: 20px;
  text-align: left;
  width: 100%;
  color: #ddd;
}

.modal-footer {
  text-align: right;
  border-top: 4px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 40px;
}

.modal-footer > button {
  min-width: 60px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  padding: 3px 15px;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid #666;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ddd;
  margin-right: 20px;
  margin-top: 4px;
}

.modal-footer > button:hover {
  color: aqua;
}
</style>
