<script setup lang="ts">
interface Props {
  title?: string
  showButton?: boolean
  link?: string
  leftButton?: string
  showLeftButton?: boolean
  rightButton?: string
}
withDefaults(defineProps<Props>(), {
  title: '设置',
  showButton: false,
  link: '',
  leftButton: '取消',
  rightButton: '确认',
  showLeftButton: false
})
const emits = defineEmits(['close', 'ok'])
</script>
<template>
  <div class="poplist">
    <div class="poplist_head">
      <div class="roam_custom_head_left"><span></span>{{ title }}</div>
      <div class="roam_custom_head_right" v-show="link">
        <a :href="`${link}`" target="_blank"> {{ link }}</a>
      </div>
    </div>
    <div class="poplist_content">
      <slot></slot>
    </div>
    <div class="poplist_footer" v-if="showButton">
      <button @click="emits('close')" v-if="showLeftButton">
        {{ leftButton }}
      </button>
      <button @click="emits('ok')">{{ rightButton }}</button>
    </div>
  </div>
</template>

<style scoped>
.poplist {
  width: 100%;
  height: auto;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-top: 1px solid #111111;
  border-bottom: 1px solid #111111;
}

.poplist_head {
  /* width: 100%; */
  /* flex: 1; */
  height: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;
  margin: 0 15px;
  border-bottom: 1px solid rgba(183, 183, 183, 0.5);
  font-size: 12px;
}

.roam_custom_head_left {
  position: relative;
  color: #fff;
  user-select: none;
}

.roam_custom_head_left > span {
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 1px;
  background: #fff;
}

.roam_custom_head_right {
  color: rgba(230, 230, 230, 1);
  padding: 3px 10px;
  /* border: 1px solid #3b3c40; */
  border-radius: 4px;
  max-width: 100px;
  overflow: hidden;
}

.roam_custom_head_right > a {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
  font-size: 12px;
  color: rgba(230, 230, 230, 1);
  text-decoration: none;
}

.poplist_content {
  padding: 15px;
}

.poplist_footer {
  display: flex;
  align-items: center;
  padding: 0px 20px 0px 10px;
  justify-content: flex-end;
}

.poplist_footer > button {
  width: 80px;
  height: 32px;
  background: rgba(28, 28, 29, 0.6);
  border-radius: 4px;
  border: 1px solid #3b3c40;
  cursor: pointer;
  color: rgba(230, 230, 230, 1);
  margin-left: 20px;
}

.poplist_footer > button:hover {
  border: 1px solid rgba(44, 104, 247, 1);
}
</style>
