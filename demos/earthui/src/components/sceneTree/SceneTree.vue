<template>
  <div class="scene-tree-wrapper" @dragenter="dragEnter($event)" @dragleave="dragLeave($event)"
    @dragover="dragOver($event)" @drop="dropFile($event)">
    <div class="scene-tree-wrapper_left" @contextmenu.stop.prevent=contexMenuEvent(undefined)></div>
    <div class="scene-tree-wrapper_center">
      <TreeComp :tree="(sceneTree as unknown as Tree<TreeItem>)" @click="whiteSpaceClick" @blur="whiteSpaceClick"
        @contextmenu.stop.prevent=contexMenuEvent(undefined)>
        <template v-slot:default="slotProps">
          <SceneTreeItemComp :sceneTreeItem="(slotProps.treeItem as unknown as SceneTreeItem)" :key="slotProps.key"
            @contexMenuEvent="(sceneUiTreeObject: SceneTreeItem | undefined) => contexMenuEvent(sceneUiTreeObject)"
            :isLastSelectedObject="(slotProps.treeItem as unknown as SceneTreeItem) === sceneTree.lastSelectedItem"
            :tree="sceneTree" :showCheckBox="showCheckBox" @close="close">
          </SceneTreeItemComp>
        </template>
      </TreeComp>
      <ContextMenuCom :baseItems="menuContent"></ContextMenuCom>
    </div>
    <div class="scene-tree-wrapper_right" @contextmenu.stop.prevent=contexMenuEvent(undefined)></div>
  </div>
  <ImagesCzm :sceneObject="popTreeItem" v-if="popTreeItem" @close="popTreeItem = undefined"></ImagesCzm>
  <DraggablePopup2 :title="'属性管理器'" :left="'calc(100% - 400px)'" v-if="propIsShow" @close="close" :width="400"
    :top="'calc(100% - 630px)'" :height="'600px'">
    <PropTreeWrapper v-if="propIsShow" :nameTitle="'属性管理器'" :propTree="propTreeRef" :key="propTreeKey">
    </PropTreeWrapper>
  </DraggablePopup2>
  <CreateSceneObjFromJson :isShow="createSceneObjFromJsonShow" @changeShow="createSceneObjFromJsonShow = false">
  </CreateSceneObjFromJson>
  <LiftHeight :isShow="liftHeightShow" @changeShow="liftHeightShow = false" :liftHeightTreeItem="liftHeightTreeItem"
    :key="liftHeightType" :liftHeightType="liftHeightType" :liftHeightName="liftHeightName">
  </LiftHeight>
  <SetStyle v-if="setStyleShow" :isShow="setStyleShow" @changeShow="setStyleShow = false"
    :setStyleTreeItem="setStyleTreeItem">
  </SetStyle>
</template>
<script setup lang="ts">
import { FileHandleType, Message, createVueDisposer, getSaveFileHandle, messageBox, saveFile, toReadonlyVueRef, toRefKey, toVR } from "earthsdk-ui";
import { ES3DTileset, ESGeoJson, ESGeoVector, ESImageryLayer, ESLocalSkyBox, ESObjectWithLocation, ESPath, ESTerrainLayer, PropTree, SceneTree, SceneTreeItem } from 'earthsdk3';
import { Ref, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { JsonValue, Tree, TreeItem, TreeItemInsertFlag } from "xbsj-base";
import { getNoToken } from "../../api/service";
import { XbsjEarthUi } from "../../scripts/xbsjEarthUi";
import DraggablePopup2 from '../DraggablePopup2.vue';
import ImagesCzm from "../cesiumView/ImagesCzm.vue";
import ContextMenuCom from "../commom/ContextMenuCom.vue";
import TreeComp from "../commom/Tree.vue";
import PropTreeWrapper from "../propTree/PropTreeWrapper.vue";
import SceneTreeItemComp from "./SceneTreeItem.vue";
import CreateSceneObjFromJson from "./scenetreeCreate/CreateSceneObjFromJson.vue";
import LiftHeight from "./scenetreeCreate/LiftHeight.vue";
import SetStyle from "./scenetreeCreate/SetStyle2.vue";
import { createLines, createObj, createSceneJson, createpoints, createpolygons, geoJsonTOESObjects, geojsonToPointsLinesPolygons, save, saveFileHandle, searchAllESObjectWithLocationFromselectItem, searchAllEspathFromselectItem, searchCheckedFromFolders, searchCheckedTreeItems, searchGeoObjsValues, searchSceneObjectFromFolders, searchSceneObjectTreeItems } from "./tools";

const props = withDefaults(defineProps<{
  showCheckBox: boolean
  clickEmpty: boolean,
}>(), {
  showCheckBox: false,
  clickEmpty: false,
});
const emits = defineEmits(['closeClickEmpty'])
const xbsjEarthUi = inject('xbsjEarthUi') as XbsjEarthUi
const sceneTree = inject('sceneTree') as SceneTree
const propIsShow = ref(false)
const disposer = createVueDisposer(onBeforeUnmount);
const { propUiTreeManager } = xbsjEarthUi;
const propTreeRef = toReadonlyVueRef(disposer, [propUiTreeManager, 'propTree']) as Ref<PropTree>;
const sceneTreeCheckedIcon = toVR<boolean>(disposer, [xbsjEarthUi, "sceneTreeCheckedIcon"])
watch(() => props.clickEmpty, (val) => {
  if (val) {
    contexMenuEvent(undefined)
    emits('closeClickEmpty')
  }
})
const propTreeKey = toRefKey(propTreeRef);
const close = () => {
  propIsShow.value = false
  xbsjEarthUi.propUiTreeManager.sceneObject = undefined;
}
const createSceneObjFromJsonShow = ref(false)
const liftHeightShow = ref(false)//抬升高度
const setStyleShow = ref(false)//设置样式
const liftHeightTreeItem = ref<any>(undefined)
const setStyleTreeItem = ref<any>(undefined)
const liftHeightType = ref<string>('')
const liftHeightName = ref<string>('')
const popTreeItem = ref()
type menuContentType = {
  text: string;
  keys: string;
  func: () => void;
} | {
  type: "divider",
}

//删除点击确认
const confirm = () => {
  const list = [...sceneTree.selectedItems] //删除选中
  list.forEach(obj => {
    if (obj.isDestroyed()) return
    obj.detachFromParent()
  })
  propIsShow.value = false
  xbsjEarthUi.propUiTreeManager.sceneObject = undefined;
  if (xbsjEarthUi.propSceneTree && xbsjEarthUi.propSceneTree.isDestroyed()) {
    xbsjEarthUi.propSceneTree = undefined
  }

  Message.success('删除成功')
}
const espathAndLocationfromChannels = () => {//返回在动画中存在的espath对象
  const path = searchAllEspathFromselectItem(xbsjEarthUi)
  const location = searchAllESObjectWithLocationFromselectItem(xbsjEarthUi)
  const channels = xbsjEarthUi.pathAnimationManager.channels
  let pathList: ESPath[] = []
  let locationList: ESObjectWithLocation[] = []
  path.forEach(item => {
    channels.forEach(i => {
      if (item.id === i.pathId) pathList.push(item)
    })
  })
  location.forEach(item => {
    channels.forEach(i => {
      i.sceneObjectIds.forEach(element => {
        if (item.id === element) locationList.push(item)
      })
    })
  })

  return { pathList, locationList }
}
const deleteFlad = ref(true)
const clickDelete = () => {
  const pathAndLocationList = espathAndLocationfromChannels()
  if (pathAndLocationList.pathList.length > 0 || pathAndLocationList.locationList.length > 0) {
    Message.warning('选择删除的对象在动画中存在，请先删除对应动画之后再删除节点')
    deleteFlad.value = true
    return
  }
  messageBox({ text: '确认删除图层?' })
    .then(() => {
      deleteFlad.value = true
      confirm()
    })
    .catch((err) => {
      deleteFlad.value = true
    })
}

onMounted(() => {
  window.addEventListener('keydown', deleteItem)
  window.addEventListener('keydown', changeSceObjName)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', deleteItem)
    window.removeEventListener('keydown', changeSceObjName)
  })
})
//添加文件夹
const addNewTreeItem = (treeItem: SceneTreeItem | undefined, location?: TreeItemInsertFlag | undefined) => {
  const groupscenetreeitem = sceneTree.createGroupTreeItem(undefined, undefined, treeItem, location)
  if (!groupscenetreeitem) return
  groupscenetreeitem.name = '新建文件夹';
}

const saveAs = async (json: JsonValue, name?: string) => {
  try {
    let handle: FileHandleType | undefined
    Message.warning('正在另存为..');
    if (name === undefined) {
      handle = await getSaveFileHandle('json', name);
    } else if (name === 'scene') {
      handle = await getSaveFileHandle('json', name);
    } else {
      handle = await getSaveFileHandle('json', `${name}.sceneObject`);
    }
    if (!handle) return;
    const jsonStr = JSON.stringify(json, undefined, '    ');
    await saveFile(handle, jsonStr);
    Message.success('另存成功!');
  } catch (error) {
    Message.error(`另存失败! error: ${error}`);
  }
}
let checkedItems: any
let fatherItem: any
const whiteSpaceClick = () => {
  sceneTree.sceneUiTree.clearAllSelectedItems()
  close()
}
const locationAndVectorNumber = (checkLiftSceneObj: any[]) => {
  let num = 0
  if (checkLiftSceneObj.length > 0) {
    checkLiftSceneObj.forEach((item: SceneTreeItem) => {
      if (item instanceof ESObjectWithLocation || item instanceof ESGeoVector) {
        num++
      }
    });
  }
  return num
}
const whiteSpaceContexMenuEvent = () => {//空白右键
  const baseItems: Array<menuContentType> = [
    {
      text: "添加文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(undefined)
      },
    },
    {
      text: "下载场景配置",
      keys: "",
      func: () => {
        const json = xbsjEarthUi.json;
        const name = 'scene'
        console.log(json);
        saveAs(json, name);
      },
    },
    {
      text: "抬升高度",
      keys: "",
      func: () => {
        if (!liftHeightShow.value) {
          liftHeightType.value = 'blank'
          liftHeightTreeItem.value = undefined
          liftHeightName.value = '多对象'
        }
        liftHeightShow.value = false
        setTimeout(() => {
          liftHeightShow.value = true
        }, 100)
      },
    },
    {
      text: "导出为Geojson文件",
      keys: "",
      func: async () => {
        let checkLiftSceneObj
        if (sceneTreeCheckedIcon.value) {
          checkLiftSceneObj = searchCheckedTreeItems(xbsjEarthUi)
        } else {
          checkLiftSceneObj = searchSceneObjectTreeItems(xbsjEarthUi)
        }
        const a = searchGeoObjsValues(xbsjEarthUi, checkLiftSceneObj)
        const num = locationAndVectorNumber(checkLiftSceneObj)
        try {
          Message.warning('正在另存为..');
          const handle = await saveFileHandle('geoJson', 'geoJson场景对象');
          if (!handle) return;
          const jsonStr = JSON.stringify(a, undefined, '    ');
          await save(handle, jsonStr);
          if (num > 0) {
            Message.success(`另存成功${num}个对象!`);
          } else {
            Message.warning(`导出文件为空!`);
          }
        } catch (error) {
          Message.error(`另存失败! error: ${error}`);
        }
      },
    },
    {
      text: "通过json创建对象",
      keys: "",
      func: () => {
        createSceneObjFromJsonShow.value = true
      },
    }, {
      text: "新建对象",
      keys: "",
      func: async () => {
        const type = await xbsjEarthUi.getSceneObjectType()
        if (!type) {
          return;
        }
        const sceneTree = xbsjEarthUi.getSceneTree()
        if (!sceneTree) return
        let treeItem: any
        const lastSceneTreeItem = sceneTree.lastSelectedItem
        if (!lastSceneTreeItem) {
          treeItem = sceneTree.createSceneObjectTreeItem(type)
        } else {
          if (lastSceneTreeItem.type === 'Folder') {
            treeItem = sceneTree.createSceneObjectTreeItem(type, undefined, lastSceneTreeItem, 'Inner')
          } else {
            treeItem = sceneTree.createSceneObjectTreeItem(type, undefined, lastSceneTreeItem, 'After')
          }
        }
        sceneTree.uiTree.clearAllSelectedItems()
        treeItem.uiTreeObject.selected = true
        xbsjEarthUi.propSceneTree = treeItem
        const { sceneObject } = treeItem
        if (sceneObject && 'editing' in sceneObject) {
          sceneObject.editing = true
        }
      },
    },
    {
      text: "强制刷新",
      keys: "",
      func: () => {
        if (!xbsjEarthUi.activeViewer) return
        xbsjEarthUi.activeViewer.forceRecreate()
      },
    },
    {
      text: "缓存当前场景",
      keys: "",
      func: () => {
        const lastJson = window.localStorage.getItem('xbsjEarthUi_lastJson')
        if (lastJson) {
          messageBox({ text: '已有缓存场景，是否覆盖?' })
            .then(() => {
              const json = xbsjEarthUi.json
              console.log(json);
              window.localStorage.setItem('xbsjEarthUi_lastJson', JSON.stringify(json))
              Message.success('缓存成功')
            })
            .catch((err) => {
            })
        } else {
          const json = xbsjEarthUi.json
          console.log(json);
          window.localStorage.setItem('xbsjEarthUi_lastJson', JSON.stringify(json))
          Message.success('缓存成功')
        }
      },
    },
  ];
  const item = {
    text: "加载已缓存场景",
    keys: "",
    func: () => {
      messageBox({ text: '确认加载已缓存场景吗？' }).then(() => {
        if (xbsjEarthUi.propSceneTree && xbsjEarthUi.propSceneTree.isDestroyed()) {
          xbsjEarthUi.propSceneTree = undefined
        }
        propIsShow.value = false
        xbsjEarthUi.propUiTreeManager.sceneObject = undefined;
        const json = window.localStorage.getItem('xbsjEarthUi_lastJson')
        if (json) {
          const a = JSON.parse(json)
          console.log(a);
          if (a.lastView && a.lastView.position && a.lastView.rotation) {
            xbsjEarthUi.activeViewer?.flyIn(a.lastView.position, a.lastView.rotation)
          }
          xbsjEarthUi.json = a
          Message.success('加载缓存场景成功')
        }
        xbsjEarthUi.propSceneTree = undefined
        close()
      }).catch(() => {

      })


    },
  }
  const json = window.localStorage.getItem('xbsjEarthUi_lastJson')
  if (json) {
    baseItems.push(item)
  }
  menuContent.value = baseItems
}
const saveFlyParms = async (sceneObject: any) => {
  let position: [number, number, number];
  let rotation: [number, number, number];
  const res = await xbsjEarthUi.activeViewer?.getCurrentCameraInfo()
  if (!res) {
    Message.warning('无法获取视角')
    return
  }
  position = res.position
  rotation = res.rotation
  //@ts-ignore
  sceneObject.flyInParam = { position, rotation, flyDuration: 1 }
  Message.success('保存视角成功')
}
const saveParms = async (treeItem: SceneTreeItem) => {
  const { sceneObject } = treeItem
  if (sceneObject instanceof ESLocalSkyBox) {
    saveFlyParms(sceneObject)
  } else if (sceneObject instanceof ESObjectWithLocation) {
    sceneObject.calcFlyToParam()
    Message.success('保存视角成功')
  } else {
    saveFlyParms(sceneObject)
  }
}
const treeItemContexMenuEvent = (treeItem: SceneTreeItem) => {//文件夹右键
  const baseItems: Array<menuContentType> = [
    {
      text: "添加同级文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(treeItem, 'After');
      },
    },
    {
      text: "添加内部文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(treeItem, 'Inner');
      },
    },
    {
      type: "divider",
    },
    {
      text: "导出为Geojson文件",
      keys: "",
      func: async () => {
        let checkLiftSceneObj
        if (sceneTreeCheckedIcon.value) {
          checkLiftSceneObj = searchCheckedFromFolders(treeItem)
        } else {
          checkLiftSceneObj = searchSceneObjectFromFolders(treeItem)
        }
        const a = searchGeoObjsValues(xbsjEarthUi, checkLiftSceneObj)
        const num = locationAndVectorNumber(checkLiftSceneObj)
        try {
          Message.warning('正在另存为..');
          const handle = await saveFileHandle('geoJson', `${treeItem.name}-geoJson场景对象`);
          if (!handle) return;
          const jsonStr = JSON.stringify(a, undefined, '    ');
          await save(handle, jsonStr);
          if (num > 0) {
            Message.success(`另存成功${num}个对象!`);
          } else {
            Message.warning(`导出文件为空!`);
          }
        } catch (error) {
          Message.error(`另存失败! error: ${error}`);
        }
      },
    },
    {
      text: "克隆",
      keys: "",
      func: () => {
        if (!treeItem.parent) {
          console.warn(`父节点不存在，无法克隆！`);
          return;
        }
        if (!treeItem.parent.children) {
          console.error(`父节点的children属性必须存在，否则当前节点从哪里来？treeItem.parent.children`);
          return;
        }
        const cloneTreeItem = treeItem.clone();
        if (!cloneTreeItem) {
          console.warn(`节点克隆失败！`);
          return;
        }
        treeItem.parent.children.push(cloneTreeItem);
      },
    },
    {
      text: "剪切",
      keys: "",
      func: () => {
        checkedItems = [...sceneTree.selectedItems]
        if (!checkedItems.includes(treeItem)) {
          checkedItems.push(treeItem)
        }
      },
    },
    {
      text: "删除",
      keys: "",
      func: () => {
        clickDelete()
      },
    },
    {
      type: "divider",
    },
    {
      text: "抬升高度",
      keys: "",
      func: () => {
        liftHeightShow.value = false
        if (!liftHeightShow.value) {
          liftHeightType.value = 'folder'
          liftHeightTreeItem.value = treeItem
          liftHeightName.value = treeItem.name
        }
        setTimeout(() => {
          liftHeightShow.value = true
        }, 100)
      },
    },
    {
      text: "重命名",
      keys: "",
      func: () => {
        treeItem.nameEditing = true
      },
    },
    {
      text: "打印配置",
      keys: "",
      func: () => {
        const jsonStr = treeItem?.jsonStr;
        if (jsonStr) {
          console.log(jsonStr);
        }
      },
    },
    {
      text: "下载配置",
      keys: "",
      func: () => {
        const json = treeItem?.json;
        const name = treeItem?.name
        saveAs(json, name);
      },
    },

  ]
  const pasteList: Array<menuContentType> = [
    {
      text: "粘贴到节点下方",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'after')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'after')
          checkedItems = null
        }
      },
    },
    {
      text: "粘贴到节点上方",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'before')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'before')
          checkedItems = null
        }
      },
    },
    {
      text: "粘贴到节点内部",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'inner')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'inner')
          checkedItems = null
        }
      },
    },
  ]
  if (checkedItems) {
    pasteList.forEach((item) => {
      baseItems.splice(5, 0, item)
    })
  }


  menuContent.value = baseItems
}
const imageContexMenuEvent = (treeItem: SceneTreeItem) => {//节点右键

  const baseItems: Array<menuContentType> = [
    {
      text: "定位",
      keys: "",
      func: () => {
        flyTo(treeItem);
      },
    },
    {
      text: "保存观察视角",
      keys: "",
      func: () => {
        saveParms(treeItem)
      },
    },
    {
      type: "divider",
    },
    {
      text: "剪切",
      keys: "",
      func: () => {
        checkedItems = [...sceneTree.selectedItems]
        if (!checkedItems.includes(treeItem)) {
          checkedItems.push(treeItem)
        }
      },
    },
    {
      text: "克隆",
      keys: "",
      func: () => {
        if (!treeItem.parent) {
          console.warn(`父节点不存在，无法克隆！`);
          return;
        }

        if (!treeItem.parent.children) {
          console.error(`父节点的children属性必须存在，否则当前节点从哪里来？treeItem.parent.children`);
          return;
        }
        const cloneTreeItem = treeItem.clone();
        if (!cloneTreeItem) {
          console.warn(`节点克隆失败！`);
          return;
        }
        treeItem.parent.children.push(cloneTreeItem);
      },
    },
    {
      text: "删除",
      keys: "",
      func: () => {
        clickDelete()
      },
    },
    {
      type: "divider",
    },
    {
      text: "重命名",
      keys: "",
      func: () => {
        treeItem.nameEditing = true
      },
    },
    {
      text: "打印配置",
      keys: "",
      func: () => {
        const jsonStr = treeItem.sceneObject?.json;
        if (jsonStr) {
          console.log(jsonStr);
        }
      },
    }, {
      text: "复制对象json",
      keys: "",
      func: () => {
        const jsonStr = treeItem.sceneObject?.json;
        if (jsonStr) {
          copyClipboard(JSON.stringify(jsonStr))
        }
      },
    },
    {
      text: "下载配置",
      keys: "",
      func: () => {
        const json = treeItem.sceneObject?.json;
        const name = treeItem.sceneObject?.name
        saveAs(json, name);
      },
    },
    {
      type: "divider",
    },
    {
      text: "属性",
      keys: "",
      func: () => {
        xbsjEarthUi.propSceneTree = treeItem
      },
    },
    {
      text: "完整属性",
      keys: "",
      func: () => {
        propIsShow.value = true
        xbsjEarthUi.propUiTreeManager.sceneObject = treeItem.sceneObject;
      },
    }
  ]
  const pasteList: Array<menuContentType> = [
    {
      text: "粘贴到节点下方",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'after')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'after')
          checkedItems = null
        } else {
          checkedItems = null
        }
      },
    },
    {
      text: "粘贴到节点上方",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'before')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'before')
          checkedItems = null
        } else {
          checkedItems = null
        }
      },
    },
    {
      text: "粘贴到节点内部",
      keys: "",
      func: () => {
        fatherItem = treeItem
        if (Tree.canMoveToTreeItems(checkedItems, fatherItem, 'inner')) {
          Tree.moveToTreeItems(checkedItems, fatherItem, 'inner')
          checkedItems = null
        } else {
          checkedItems = null
        }
      },
    },
  ]
  if (checkedItems) {
    pasteList.forEach((item) => {
      baseItems.splice(-8, 0, item)
    })
  }
  const enditingList = {
    text: "编辑",
    keys: "",
    func: () => {
      let dispose: any
      if (treeItem.sceneObject) {
        if ('editing' in treeItem.sceneObject) {
          treeItem.sceneObject.editing = true
          Message.loading({ id: 'xxx', content: '1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换' })
          //@ts-ignore
          dispose = treeItem.sceneObject.editingChanged.disposableOnce((res: boolean) => {
            if (!res) {
              Message.remove('xxx')
              dispose()
              dispose = undefined
            }
          })
        }
      }
    },
  }
  if (treeItem.sceneObject) {
    if ('positionEditing' in treeItem.sceneObject || 'editing' in treeItem.sceneObject) {
      if ((!(treeItem.sceneObject instanceof ES3DTileset)) || (treeItem.sceneObject instanceof ES3DTileset && treeItem.sceneObject.supportEdit)) {
        baseItems.splice(1, 0, enditingList)
      }
    }
  }
  const Geojson = {
    text: "转为ES点线面对象",
    keys: "",
    func: () => {
      if (treeItem.sceneObject) {
        const sceneObject = treeItem.sceneObject as ESGeoJson
        const url = sceneObject.url
        if (!url) {
          Message.error('此场景对象不存在url属性，请检查')
          return
        }
        let json
        if (typeof (url) === 'string') {
          getNoToken(url).then((res: any) => {
            json = res
          }).catch(error => {
            console.log(error);
            Message.error(`请求失败，请检查！${error}`)
          })
        } else {
          json = url
        }
        itemGeoJsonTOESObjects(json)
      }
    },
  }
  if (treeItem.sceneObject) {
    if (treeItem.sceneObject instanceof ESGeoJson) {
      baseItems.splice(2, 0, Geojson)
    }
  }
  const copyUrl =
  {
    text: "复制服务地址",
    keys: "",
    func: () => {
      if (treeItem.sceneObject) {
        if ('url' in treeItem.sceneObject) {
          const url = treeItem.sceneObject.url as string
          if (url.length > 0) {
            copyClipboard(url)
          } else {
            Message.error('url地址为空');
          }
        }
      }
    },
  }
  if (treeItem.sceneObject) {
    if (treeItem.sceneObject instanceof ESImageryLayer || treeItem.sceneObject instanceof ES3DTileset || treeItem.sceneObject instanceof ESTerrainLayer) {
      baseItems.splice(1, 0, copyUrl)
    }
  }
  const openCesium = {
    text: "加载Cesium代码",
    keys: "",
    func: () => {
      if (treeItem.sceneObject) {
        popTreeItem.value = treeItem.sceneObject
      }
    },
  }
  if (treeItem.sceneObject && treeItem.sceneObject.viewer?.getEngineType() == "ESCesiumViewer") {
    if ((treeItem.sceneObject instanceof ESImageryLayer || treeItem.sceneObject instanceof ES3DTileset || treeItem.sceneObject instanceof ESTerrainLayer)) {
      baseItems.splice(1, 0, openCesium)
    }
  }
  const liftHeight = {
    text: "抬升高度",
    keys: "",
    func: () => {
      liftHeightTreeItem.value = treeItem
      liftHeightType.value = 'node'
      //@ts-ignore
      liftHeightName.value = treeItem.sceneObject.name
      liftHeightShow.value = false
      setTimeout(() => {
        liftHeightShow.value = true
      }, 100)

    },
  }
  if (treeItem.sceneObject) {
    if (treeItem.sceneObject instanceof ESObjectWithLocation || treeItem.sceneObject instanceof ESGeoVector) {
      baseItems.splice(8, 0, liftHeight)
    }
  }
  const set3DTileasetStyle = {
    text: "样式设置",
    keys: "",
    func: () => {
      setStyleTreeItem.value = treeItem
      setStyleShow.value = false
      setTimeout(() => {
        setStyleShow.value = true
      }, 100)
    },
  }
  if (treeItem.sceneObject) {
    if (treeItem.sceneObject instanceof ES3DTileset) {
      baseItems.splice(13, 0, set3DTileasetStyle)
    }
  }
  const ESObjToGeojson = {
    text: "导出为Geojson文件",
    keys: "",
    func: async () => {
      const a = searchGeoObjsValues(xbsjEarthUi, [treeItem.sceneObject])
      const num = locationAndVectorNumber([treeItem.sceneObject])
      try {
        Message.warning('正在另存为..');
        const handle = await saveFileHandle('geoJson', `${treeItem.name}-geoJson场景对象`);
        if (!handle) return;
        const jsonStr = JSON.stringify(a, undefined, '    ');
        await save(handle, jsonStr);
        if (num > 0) {
          Message.success(`另存成功${num}个对象!`);
        } else {
          Message.warning(`导出文件为空!`);
        }
      } catch (error) {
        Message.error(`另存失败! error: ${error}`);
      }
    },
  }
  if (treeItem.sceneObject) {
    if (treeItem.sceneObject instanceof ESObjectWithLocation || treeItem.sceneObject instanceof ESGeoVector) {
      baseItems.splice(8, 0, ESObjToGeojson)
    }
  }

  menuContent.value = baseItems
}

const copyClipboard = async (text: string) => {//复制
  navigator.clipboard.writeText(text)
    .then(function () {
      Message.success('复制成功');
    }, function (e) {
      Message.error(`复制失败!error:${e}`);
    });
}

const deleteItem = (e: KeyboardEvent) => {
  if (e.key === 'Delete') {
    if (deleteFlad.value) {
      if (sceneTree.selectedItems.length === 0) return
      deleteFlad.value = false
      clickDelete()
    }

  }
}
const changeSceObjName = (event: KeyboardEvent) => {
  if (event.keyCode === 113) {
    const select = [...sceneTree.selectedItems]
    if (select.length > 1) {
      Message.warning('请选中一个对象进行名称修改')
      return
    }
    const lastSelectedItem = sceneTree.lastSelectedItem
    if (!lastSelectedItem) return
    lastSelectedItem.nameEditing = true
  }
}
const menuContent = ref<Array<menuContentType>>([])
const contexMenuEvent = (treeItem: SceneTreeItem | undefined) => {//树内右键暴露出来的事件
  if (!treeItem) {
    whiteSpaceContexMenuEvent()
  } else if (treeItem.type === 'Folder') {
    treeItemContexMenuEvent(treeItem)
  } else {
    imageContexMenuEvent(treeItem)
  }
}
const flyTo = (treeItem: SceneTreeItem) => {
  const { sceneObject } = treeItem
  if (sceneObject instanceof ESLocalSkyBox) {
    sceneObject.flyIn()
  } else if (sceneObject && Reflect.has(sceneObject, 'flyTo')) {
    // @ts-ignore
    sceneObject.flyTo()
  } else {
    Message.warning('暂不支持定位!')
  }
}
//拖拽Geojson
const dragEnter = (event: Event) => {
  event.preventDefault();
}
const dragLeave = (event: Event) => {
  event.preventDefault();
}
const dragOver = (event: Event) => {
  event.preventDefault();
}
const dropFile = async (event: Event) => {
  event.preventDefault();
  //@ts-ignore
  let fileList = event.dataTransfer.files
  Object.keys(fileList).forEach(item => {
    const reader = new FileReader()
    reader.readAsText(fileList[item], 'utf8')
    reader.onload = () => {
      if (!reader.result) return
      const result = reader.result as string
      const a = JSON.parse(result)
      if (a.type === 'Geometry' || a.type === 'Feature' || a.type === 'FeatureCollection' || a.type === 'Point' || a.type === 'LineString' || a.type === 'Polygon' || a.type === 'MultiPoint' || a.type === 'MultiLineString' || a.type === 'MultiPolygon' || a.type === 'GeometryCollection' || a.type === 'Topology') {
        geoJsonTOESObjects(xbsjEarthUi, a)
      } else if (a.sceneTree && a.asset) {
        createSceneJson(xbsjEarthUi, a)
      } else if (a.type) {
        createObj(xbsjEarthUi, a)
      } else {
        Message.warning('请拖入正确的json格式')
      }
    }
    reader.onerror = () => {
      console.log('onError')
    }
  })
}

const itemGeoJsonTOESObjects = (a: any) => {
  const b = geojsonToPointsLinesPolygons(a)
  setTimeout(() => {
    if (b.points.length > 0 || b.lines.length > 0 || b.polygons.length > 0) {
      const group = xbsjEarthUi.sceneTree.createGroupTreeItem('Geojson')
      if (b.points.length > 0) {
        const pointsGroup = xbsjEarthUi.sceneTree.createGroupTreeItem('points', undefined, group, 'Inner') as SceneTreeItem
        createpoints(xbsjEarthUi, b.points, pointsGroup)
      }
      if (b.lines.length > 0) {
        const linesGroup = xbsjEarthUi.sceneTree.createGroupTreeItem('lines', undefined, group, 'Inner') as SceneTreeItem
        createLines(xbsjEarthUi, b.lines, linesGroup)
      }
      if (b.polygons.length > 0) {
        const polygonsGroup = xbsjEarthUi.sceneTree.createGroupTreeItem('polygons', undefined, group, 'Inner') as SceneTreeItem
        createpolygons(xbsjEarthUi, b.polygons, polygonsGroup)
      }
    } else {
      Message.warning('请检查geojson格式是否正确')
    }
  }, 100)
}
</script>

<style scoped>
.scene-tree-wrapper {
  height: calc(100% - 20px);
  display: flex;
}

.scene-tree-wrapper_left,
.scene-tree-wrapper_right {
  width: 20px;
  height: 100%;
}

.scene-tree-wrapper_center {
  flex: 1;
}

.scene-tree-comp {
  width: 100%;
  height: calc(100% - 30px);
}
</style>