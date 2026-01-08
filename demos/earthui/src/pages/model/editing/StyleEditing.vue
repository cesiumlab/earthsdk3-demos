<template>
  <PopList :title="'样式编辑器'" :showButton="true" @ok="ok">
    <div class="model_style_box_content">
      <div class="model_content_top">
        <div class="model_style_textarea">
          <textarea v-model="styleContent"></textarea>
        </div>
        <div class="model_style_footer">
          <a
            href="https://github.com/AnalyticalGraphicsInc/3d-tiles/tree/master/specification/Styling"
            target="_blank"
            >style语言说明</a
          >
          <button @click="saveStyle">另存为新样式</button>
          <button @click="useStyle">应用</button>
        </div>
      </div>
    </div>
    <div class="images_bottom_content">
      <div class="images_img_list">
        <div v-for="(item, index) in styleList" class="images_img_lilist">
          <div
            class="images_imgposition"
            :class="{ images_checkedactive: checkedactive == index }"
            @click="changeStyle(item, index)"
            @contextmenu.prevent.stop="ElMessage.warning('默认样式禁止修改')"
          >
            <img :src="item.thumbnail" alt="" />
            <span v-show="iconIsShow == index ? true : false">{{ item.name }}</span>
          </div>
          <div
            class="images_onlineimageName"
            @mouseenter="iconIsShow = index"
            @mouseleave="iconIsShow = null"
          >
            {{ item.name }}
          </div>
        </div>
        <div v-for="(item, index) in localStorageStyle" class="images_img_lilist">
          <div
            class="images_imgposition"
            :class="{ images_checkedactive: checkedactive == index + 5 }"
            @click="changeStyle(item, index + 5)"
            @contextmenu.prevent.stop="contexMenuEvent(item, index)"
          >
            <img :src="item.thumbnail" alt="" />
            <span v-show="iconIsShow == index ? true : false">{{ item.name }}</span>
          </div>
          <div
            class="images_onlineimageName"
            @mouseenter="iconIsShow = index"
            @mouseleave="iconIsShow = null"
            v-if="inputIndex !== index"
          >
            {{ item.name }}
          </div>
          <input
            class="model_content_right_input"
            type="text"
            v-model="inputValue"
            v-else
            @blur="changeName(item, index)"
            @keydown.enter="changeName(item, index)"
            :key="index"
            ref="myInput"
          />
        </div>
      </div>
    </div>
  </PopList>
  <ContextMenuCom :baseItems="menuContent"></ContextMenuCom>
</template>
<script setup lang="ts">
import { messageBox } from 'earthsdk-ui'
import { ElMessage } from 'element-plus'
import { ES3DTileset } from 'earthsdk3'
import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { SceneTree } from 'earthsdk3'
import PopList from '../../../components/PopList.vue'
import ContextMenuCom from '../../../components/commom/ContextMenuCom.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
type menuContentType =
  | {
      text: string
      keys: string
      func: () => void
    }
  | {
      type: 'divider'
    }
const menuContent = ref<Array<menuContentType>>([])
const props = withDefaults(
  defineProps<{
    defaultStyle: string
  }>(),
  {}
)
const { defaultStyle } = props
const styleList = ref([
  {
    name: '默认样式',
    code: 'var style={}',
    thumbnail:
      'data:image/jpeg;base64,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'
  },
  {
    name: '纯色',
    code: 'var style = {\r\n    color: "vec4(1,0,0,1)"\r\n}',
    thumbnail:
      'data:image/jpeg;base64,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'
  },
  {
    name: '半透明',
    code: 'var style = {\r\n    color: "vec4(1,1,1,0.5)"\r\n}',
    thumbnail:
      'data:image/jpeg;base64,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'
  },
  {
    name: '分类全透',
    code: 'var style = {\r\n    color: "vec4(0,0,1,0.01)"\r\n}',
    thumbnail:
      'data:image/jpeg;base64,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'
  },
  {
    name: '分类浅色',
    code: 'var style = {\r\n    color: "vec4(0,0,1,0.1)"\r\n}',
    thumbnail:
      'data:image/jpeg;base64,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'
  }
])
const localStorageStyle = ref()
const styleContent = ref()
const checkedactive = ref()
const iconIsShow = ref()
const inputIndex = ref()
const inputValue = ref()
const contextmenuItem = ref()
const myInput = ref<HTMLElement>()
const flag = ref(false)
const emits = defineEmits(['close'])
//失去焦点,按键enter
const changeName = (item: any, index: number) => {
  const modelStyle = window.localStorage.getItem('modelStyle')
  if (modelStyle) {
    const a = JSON.parse(modelStyle)
    a[index].name = inputValue.value
    window.localStorage.setItem('modelStyle', JSON.stringify(a))
    localStorageStyle.value = a
  }
  inputIndex.value = null
}
const contexMenuEvent = (item: any, index: number) => {
  //元素右键
  contextmenuItem.value = item
  if (!item) return
  const baseItems: Array<menuContentType> = [
    {
      text: '重命名',
      keys: '',
      func: () => {
        inputIndex.value = index
        inputValue.value = item.name
      }
    },
    {
      text: '更新缩略图',
      keys: '',
      func: () => {
        messageBox({ text: '确认更新缩略图吗？' })
          .then(() => {
            updateConfirm(index)
          })
          .catch((err) => {})
      }
    },
    {
      text: '删除',
      keys: '',
      func: () => {
        messageBox({ text: '确认删除？' })
          .then(() => {
            deleteConfirm(index)
          })
          .catch((err) => {})
      }
    }
  ]
  menuContent.value = baseItems
}
const close = () => {
  // const lastSelectedItem = sceneTree.lastSelectedItem
  // if (!lastSelectedItem) return
  // if (lastSelectedItem.type === 'ES3DTileset') {
  //     const sceneObject = lastSelectedItem.sceneObject as ES3DTileset
  //     if (styleTransformJson(defaultStyle)) {
  //         sceneObject.czmStyleJson = styleTransformJson(defaultStyle)
  //     } else {
  //         sceneObject.czmStyleJson = styleTransformJson('var style={}')
  //     }
  // }
  emits('close')
}
//删除
const deleteConfirm = (index: number) => {
  const modelStyle = window.localStorage.getItem('modelStyle')
  if (modelStyle) {
    let a = JSON.parse(modelStyle)
    a.splice(index, 1)
    window.localStorage.setItem('modelStyle', JSON.stringify(a))
    localStorageStyle.value = a
  }
  inputIndex.value = null
}

//更新缩略图
const updateConfirm = (index: number) => {
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer
    .capture()
    .then((res) => {
      if (res) {
        const modelStyle = window.localStorage.getItem('modelStyle')
        if (modelStyle) {
          const a = JSON.parse(modelStyle)
          a[index].thumbnail = res
          window.localStorage.setItem('modelStyle', JSON.stringify(a))
          localStorageStyle.value = a
        }
        inputIndex.value = null
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//样式转换成json
const styleTransformJson = (str: string) => {
  if (!str) return
  const f = new Function(`${str}; return style;`)
  return f()
}
const ok = () => {
  flag.value = true
  if (!styleContent.value) {
    ElMessage.error('样式未定义')
  }
  const lastSelectedItem = sceneTree.lastSelectedItem
  if (!lastSelectedItem) return
  if (lastSelectedItem.type === 'ES3DTileset') {
    const sceneObject = lastSelectedItem.sceneObject as ES3DTileset
    if (styleContent.value === '{}') {
      sceneObject.czmStyleJson = styleTransformJson('var style={}')
    } else if (styleTransformJson(styleContent.value)) {
      sceneObject.czmStyleJson = styleTransformJson(styleContent.value)
    }
  }
  emits('close', styleContent.value)
}
//另存为新样式
const saveStyle = () => {
  if (!styleContent.value) {
    ElMessage.error('请输入内容之后在保存')
    return
  }
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  viewer
    .capture()
    .then((res) => {
      if (res) {
        const parms = {
          name: '新建样式',
          code: styleContent.value,
          thumbnail: res
        }
        const modelStyle = window.localStorage.getItem('modelStyle')
        if (modelStyle) {
          const a = JSON.parse(modelStyle)
          a.push(parms)
          window.localStorage.setItem('modelStyle', JSON.stringify(a))
        } else {
          window.localStorage.setItem('modelStyle', JSON.stringify([parms]))
        }
        ElMessage.success('另存样式成功')
        updateList()
      }
    })
    .catch((error) => {
      console.log(error)
      ElMessage.error(`另存样式成功!error:${error}`)
    })
}
const useStyle = () => {
  if (!styleContent.value) {
    ElMessage.error('样式未定义')
  }
  const lastSelectedItem = sceneTree.lastSelectedItem
  if (!lastSelectedItem) return
  if (lastSelectedItem.type === 'ES3DTileset') {
    const sceneObject = lastSelectedItem.sceneObject as ES3DTileset
    if (styleTransformJson(styleContent.value)) {
      sceneObject.czmStyleJson = styleTransformJson(styleContent.value)
    }
  }
}
const changeStyle = (item: any, index: any) => {
  checkedactive.value = index
  styleContent.value = item.code
}
const updateList = () => {
  const modelStyle = window.localStorage.getItem('modelStyle')
  if (modelStyle) {
    const a = JSON.parse(modelStyle)
    localStorageStyle.value = a
  }
}
onMounted(() => {
  updateList()
})
onBeforeUnmount(() => {
  if (!flag.value) {
    close()
  }
})
</script>
