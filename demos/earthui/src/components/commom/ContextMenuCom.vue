
<script setup lang='ts'>
import { onMounted, reactive, ref, watch } from 'vue';

type MenuContentType = {
  type?: 'normal'
  text: string;
  keys: string;
  func: () => void;
} | {
  type: "divider",
}

const props = withDefaults(defineProps<{
  baseItems: MenuContentType[]
}>(), { baseItems: () => [] });

watch(() => props.baseItems, (val) => {
  if (val.length === 0) {
    return
  }
  popMenu()
})

const menubox = ref<HTMLElement>()
const watchDom = ref<HTMLElement>()
const show = ref(false)
const cursor = reactive({
  x: 0, y: 0
})
const boxStyle = ref('')

const popMenu = () => {
  if (show.value) return;
  show.value = true;
  let bottom = 0;
  props.baseItems.forEach((element) => {

    if (element.type === "divider") {
      bottom += 2;
    } else {
      bottom += 30;
    }
  });
  if (!watchDom.value) return
  const { x, y } = cursor
  if (watchDom.value.clientHeight < y + bottom) {
    cursor.y = y - bottom;
  }
  if (watchDom.value.clientWidth < x + 200) {
    cursor.x = x - 200;
  }
  boxStyle.value = `left:${cursor.x}px; top:${cursor.y}px;width:${200}px`;
}


const clickFunc = (it: MenuContentType) => {
  if (it.type === "divider") {
    return
  }
  it.func()
  show.value = false
}


onMounted(() => {
  if (!menubox.value) return;
  const dom = menubox.value.parentElement;
  if (!dom) return
  watchDom.value = document.getElementById('app') as HTMLElement
  watchDom.value.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX+8
    cursor.y = event.clientY
  });

  //@ts-ignore
  function domContain(dom: HTMLElement, child: any) {
    if (dom === child) return true;
    if (!child) return false;
    return domContain(dom, child.parentElement);
  }
  //添加一个发生在dom元素外部的事件
  function addOutterEventListener(dom: HTMLElement, name: string, callback: (e: HTMLElement) => void) {
    return document.body.addEventListener(name, (e) => {
      e = e || event;
      if (!domContain(dom, e.target)) {
        if (callback) callback(dom);
      }
    });
  }
  addOutterEventListener(menubox.value, "pointerdown", () => {
    show.value = false;
  });
})
</script>

<template>
  <teleport to="body" :disabled="false">
    <div v-show="show" class="menu-box" ref="menubox" :style="boxStyle">
      <ul>
        <li v-for="(item, index) in baseItems" :key="index" @click="clickFunc(item)"
          :class="{ divideron: item.type == 'divider' }">
          <span v-if="item.type !== 'divider'">{{ item.text }}</span>
          <span v-if="item.type !== 'divider'">{{ item.keys }}</span>
        </li>
      </ul>
    </div>
  </teleport>
</template>

<style scoped>
.menu-box {
  position: fixed;
  z-index: 30000000001;
  background: rgba(41, 42, 46, 1);
  border-radius: 4px;
  color: rgba(230, 230, 230, 1);
  box-shadow: 0px 2px 6px 0px rgba(26,26,28,0.4);
}

.menu-box>ul {
  margin: 0;
  padding: 0;
}

.menu-box ul li {
  text-align: left;
  cursor: pointer;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  box-sizing: border-box;
  list-style: none;
}

.divideron {
  width: 160px !important;
  height: 1px !important;
  margin-left: 20px;
  background:rgba(183, 183, 183, 0.1);
}

.menu-box ul li:hover {
  background: rgba(55, 57, 62, 1);
  color: #fff;
}

.menu-box ul li span {
  display: inline-block;
  font-size: 12px;
}

.menu-box ul li span:first-child {
  margin-right: 5px;
}

.menu-box ul li span:last-child {
  float: right;
  display: block
}
</style>
