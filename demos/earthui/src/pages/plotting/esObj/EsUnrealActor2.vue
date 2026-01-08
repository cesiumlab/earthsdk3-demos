<template>
  <PopList :title="'绑定场景对象'" :showButton="true" @ok="ok">
    <div>
      <LabelInput v-model="name" :label="'名称'"></LabelInput>
      <LabelInput
        v-model="actorTag"
        :label="'actorTag'"
        :checkbox="true"
        :list="option"
        :liClickFun="changeActorTag"
        :placeholder="'请填入或者选择actorTag'"
        :listContent="'value'"
      ></LabelInput>
      <div class="images_bottom_content">
        <div class="plotting_pick_tree">
          <p>*以下是带有父子层级关联关系</p>
          <Tree :tree="tree" @onItemSelected="handItemSelected" :selected="selected"></Tree>
        </div>
      </div>
    </div>
  </PopList>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { inject, onBeforeUnmount, ref } from 'vue'
import LabelInput from '../../../components/LabelInput.vue'
import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi'
import { ueActorResult2 } from './fun'
import Tree from './tree/Tree.vue'
import PopList from '../../../components/PopList.vue'
import { ESUeViewer } from 'earthsdk3-ue'
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const emits = defineEmits(['close'])
const leftulisShow = ref(false)
const ok = () => {
  if (!actorTag.value) {
    ElMessage.warning('请填写ActorTag')
    return
  }
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  if (!(viewer instanceof ESUeViewer)) return
  viewer
    .getObjectByInfo({ actorTag: actorTag.value, componentTag: undefined })
    .then((res) => {
      if (!res || !res.object) {
        ElMessage.warning('该tag无效或者重复')
      } else {
        let treeItem: any
        const lastSceneTreeItem = sceneTree.lastSelectedItem
        if (!lastSceneTreeItem) {
          treeItem = sceneTree.createSceneObjectTreeItem(res.object.type)
        } else {
          if (lastSceneTreeItem.type === 'Folder') {
            treeItem = sceneTree.createSceneObjectTreeItem(
              res.object.type,
              undefined,
              lastSceneTreeItem,
              'Inner'
            )
          } else {
            treeItem = sceneTree.createSceneObjectTreeItem(
              res.object.type,
              undefined,
              lastSceneTreeItem,
              'After'
            )
          }
        }
        sceneTree.uiTree.clearAllSelectedItems()
        treeItem.uiTreeObject.selected = true
        const sceneObject = treeItem.sceneObject
        xbsjEarthUi.propSceneTree = treeItem
        if (!sceneObject) return
        sceneObject.actorTag = actorTag.value
        sceneObject.rotation = res.object.rotation
        sceneObject.position = res.object.position
        sceneObject.name = name.value
        emits('close')
        destroy()
      }
    })
    .catch((error) => {
      console.log(error)
      emits('close')
      destroy()
    })
}
const name = ref()
const actorTag = ref()
const option = ref()
const tree = ref([])
const selected = ref()
const oldActor = ref()
//根据actor关闭高亮状态
const closeActorHighlight = (val: string, flag: boolean) => {
  if (oldActor.value) {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    if (viewer.typeName !== 'ESUeViewer') {
      ElMessage.warning('请在ue视口下操作')
      return
    }
    if (!(viewer instanceof ESUeViewer)) return
    viewer
      .highlightActorByTag(val, flag)
      .then((res) => {})
      .catch((error) => {
        console.log(error)
      })
  }
}
//ue点击拾取位置信息后执行的函数
const pos = (messages: { [key: string]: any }) => {
  if (!messages) return
  closeActorHighlight(oldActor.value, false)
  const message = messages.pickResult
  if (message.actorTags.length > 0) {
    actorTag.value = message.actorTags[message.actorTags.length - 1]
    oldActor.value = message.actorTags[message.actorTags.length - 1]
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    if (viewer.typeName !== 'ESUeViewer') {
      ElMessage.warning('请在ue视口下操作')
      return
    }
    if (!(viewer instanceof ESUeViewer)) return
    viewer
      .highlightActorByTag(actorTag.value, true)
      .then((res) => {
        //@ts-ignore
        name.value = message.name
        option.value = getSelectOption(message.actorTags)
        tree.value = arrayToTree(message)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    actorTag.value = ''
    name.value = ''
    option.value = []
    ElMessage.warning('该位置没有tag')
  }
}

//调用点击返回拾取信息函数
const dispose = ueActorResult2(xbsjEarthUi, pos)
const destroy = () => {
  //销毁
  closeActorHighlight(actorTag.value, false)
  closeActorHighlight(oldActor.value, false)
  if (dispose) dispose()
}
//选择列表
const getSelectOption = (arr: any) => {
  let options: any = []
  if (!(Array.isArray(arr) && arr.length > 0)) {
    return options
  }
  options = arr.map((val: any) => {
    return {
      value: val,
      label: val
    }
  })
  return options
}
//actor改变的时候
const changeActorTag = (item: any) => {
  actorTag.value = item.value
  const viewer = xbsjEarthUi.activeViewer
  if (!viewer) return
  if (!(viewer instanceof ESUeViewer)) return
  viewer
    .getObjectByInfo({ actorTag: item.value, componentTag: '' })
    .then((res) => {
      if (!res || !res.object) {
        ElMessage.warning('该tag无效或者重复')
      } else {
        closeActorHighlight(actorTag.value, true)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  leftulisShow.value = false
}
//选中节点
const handItemSelected = (item: any) => {
  if (item) {
    if (item.actorTags.length > 0) {
      option.value = getSelectOption(item.actorTags)
      actorTag.value = item.actorTags[item.actorTags.length - 1]
    } else {
      actorTag.value = ''
      option.value = []
      actorTag.value = undefined
      ElMessage.warning('该位置没有tag')
    }
  }
}
const arrayToTree = (info: any) => {
  let tree: any = []
  let arr = []
  let node = {
    name: info.name,
    actorTags: info.actorTags,
    className: info.className
  }
  if (info.parentInfo) {
    arr = JSON.parse(JSON.stringify(info.parentInfo))
  }
  arr.unshift(node)
  arr.reverse()
  arr.reduce((pre: any, cur: any, index: number) => {
    cur.id = getGrid()
    cur.expand = true
    cur.checked = true
    if (index != arr.length - 1) {
      cur.children = []
    }
    if (index == arr.length - 1) {
      selected.value = cur
    }
    pre.push(cur)
    return cur.children
  }, tree)
  return tree
}
//生成id
const getGrid = () => {
  var grid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0
    var v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return grid
}
onBeforeUnmount(() => destroy())
</script>
