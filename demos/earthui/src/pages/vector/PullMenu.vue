<template>
  <div class="menu-box">
    <ul class="list-unstyled">
      <li
        v-for="(it, i) in props.menuList"
        :key="i"
        @click.stop="clickItem(it)"
        @mouseenter="setCurrentTitle(it)"
        :class="{ divideron: it.type == 'divider' }"
      >
        <span v-if="it.type !== 'divider'">{{ it.text }}</span>
        <span
          v-if="it.type !== 'divider' && it.children"
          style="float: right; display: block; transform: scaleY(1.8)"
          >></span
        >
        <span v-if="it.type !== 'divider'" style="float: right; display: block">{{ it.keys }}</span>
        <ul class="list-unstyled1" v-if="it.children && currentTitle === it.text">
          <li
            v-for="(item, index) in it.children"
            :key="index"
            @click.stop="clickItem(item)"
            :class="{ divideron: item.type == 'divider' }"
          >
            <span v-if="item.type !== 'divider'">{{ item.text }}</span>
            <span v-if="item.type !== 'divider'" style="float: right; display: block">{{
              item.keys
            }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

type itemType =
  | {
      text: string
      keys: string
      func: () => void
      type?: undefined
      children?: itemType[]
    }
  | {
      type: string
      text?: undefined
      keys?: undefined
      func?: undefined
      children?: undefined
    }
const props = withDefaults(defineProps<{ menuList: itemType[] | undefined }>(), {
  menuList: undefined
})
const emits = defineEmits(['funClick'])
const clickItem = (it: any) => {
  if (typeof it.func === 'function') {
    it.func()
    emits('funClick')
    currentTitle.value = ''
  }
}

const currentTitle = ref('')
const setCurrentTitle = (item: itemType) => {
  if (!item.children || item.children.length === 0) {
    currentTitle.value = ''
    return
  } else {
    currentTitle.value = item.text
  }
}
</script>

<style scoped>
.divideron {
  height: 1px !important;
  width: 100% !important;
  line-height: 1px !important;
  background: rgb(168, 168, 168);
  opacity: 0.3;
}

.menu-box {
  width: 100%;
  margin: 0 15px 0 15px;
  color: rgba(230, 230, 230, 1);
}

.menu-box ul {
  margin: 0;
  padding: 0;
}

.menu-box ul > li {
  width: 100%;
  cursor: pointer;
  text-align: left;
  height: 30px;
  line-height: 30px;
  /* padding: 0px 10px; */
  margin: 3px 0;
  border-radius: 5px;
  box-sizing: border-box;
  list-style: none;
  transition: background 0.3s;
  position: relative;
}

.list-unstyled1,
.list-unstyled2 {
  position: absolute;
  right: -265px;
  top: 0px;
  width: 100%;
  background: #001a23;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.4);
  color: #ccc;
}

.menu-box ul li:hover {
  background: #37393e;
}

.menu-box ul li span {
  display: inline-block;
  font-size: 12px;
}

.menu-box ul li span:first-child {
  margin-right: 5px;
}
</style>
