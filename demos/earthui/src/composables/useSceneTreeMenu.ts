//右键场景树空白区域

import { localStorageKey } from '@/constants'
import { downloadJson } from '@/utils'
import dayjs from 'dayjs'
import { getCreateSceneObjectType, getEditorOption, MenuItem } from 'earthsdk-ui'
import { ESObjectsManager, SceneTree, SceneTreeItem, TreeItemInsertFlag } from 'earthsdk3'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getGeoJsonMenuContent } from './objectsToGeoJson'
import { getLiftHeightMenuContent } from './useliftHeight'
import { getSceneObjectsForMenu } from './useSceneTreeItem'

//添加文件夹
export const addNewTreeItem = (
  sceneTree: SceneTree,
  treeItem?: SceneTreeItem,
  location?: TreeItemInsertFlag
) => {
  const groupscenetreeitem = sceneTree.createGroupTreeItem(undefined, undefined, treeItem, location)
  if (!groupscenetreeitem) return
  groupscenetreeitem.name = '新建文件夹'
}

//默认右键菜单，右键树的空白区域
export const getDefauleMenuContent = (
  objm: ESObjectsManager,
  sceneTree: SceneTree
): MenuItem[] => {

  const { sceneObjects, tag } = getSceneObjectsForMenu(sceneTree);
  const geoJsonMenu = getGeoJsonMenuContent(sceneObjects, tag);
  const liftHeightMenu = getLiftHeightMenuContent(sceneObjects, tag);

  const baseMenu: MenuItem[] = [
    {
      text: '新建对象',
      keys: '',
      func: async () => {
        const type = await getCreateSceneObjectType()
        if (!type) return
        const treeItem = sceneTree.createSceneObjectTreeItem(type)
        if (!treeItem) return
        sceneTree.uiTree.clearAllSelectedItems();
        treeItem.uiTreeObject.selected = true;
        const { sceneObject } = treeItem;
        if (sceneObject && 'editing' in sceneObject) {
          sceneObject.editing = true;
        }
        ElMessage.success('创建成功')
      }
    },
    {
      text: '新建文件夹',
      keys: '',
      func: () => {
        addNewTreeItem(sceneTree)
      }
    },
    {
      text: '通过 JSON 创建对象',
      keys: '',
      func: async () => {
        const jsonStr = await getEditorOption(JSON.stringify({}), 'json')
        if (!jsonStr) return
        const json = JSON.parse(jsonStr)
        const treeItem = sceneTree.createSceneObjectTreeItemFromJson(json)
        if (!treeItem) return
        sceneTree.uiTree.clearAllSelectedItems()
        treeItem.uiTreeObject.selected = true
        ElMessage.success('创建成功')
      }
    },
    {
      type: 'divider'
    },
    {
      text: '刷新场景',
      keys: '',
      func: () => {
        objm.activeViewer?.forceRecreate()
      }
    },
    {
      ...liftHeightMenu
    },
    {
      type: 'divider'
    },
    {
      text: '下载场景 JSON',
      keys: '',
      func: () => {
        downloadJson(objm.json, 'earth_ui_scene' + dayjs().format('_MM_DD') + '.json', true)
      }
    },
    {
      ...geoJsonMenu
    },
    {
      text: '缓存当前场景',
      keys: '',
      func: () => {
        const lastJson = window.localStorage.getItem(localStorageKey.Earth_UI_STORAGE_SCENE)
        const json = objm.json
        if (lastJson) {
          ElMessageBox.confirm('已存在缓存场景，是否覆盖?').then(() => {
            window.localStorage.setItem(
              localStorageKey.Earth_UI_STORAGE_SCENE,
              JSON.stringify(json)
            )
            ElMessage.success('缓存成功')
          })
        } else {
          window.localStorage.setItem(localStorageKey.Earth_UI_STORAGE_SCENE, JSON.stringify(json))
          ElMessage.success('缓存成功')
        }
      }
    }
  ]

  const storageSceneItem = {
    text: '加载已缓存场景',
    keys: '',
    func: () => {
      ElMessageBox.confirm('加载已缓存场景会覆盖当前场景，确认加载吗？').then(() => {
        const localJsonStr = window.localStorage.getItem(localStorageKey.Earth_UI_STORAGE_SCENE)
        if (!localJsonStr) return
        const localJson = JSON.parse(localJsonStr)
        if (localJson.lastView && localJson.lastView.position && localJson.lastView.rotation) {
          objm.activeViewer?.flyIn(localJson.lastView.position, localJson.lastView.rotation)
        }
        objm.json = { ...localJson }
        ElMessage.success('缓存场景加载成功')
      })
    }
  }

  const localJson = window.localStorage.getItem(localStorageKey.Earth_UI_STORAGE_SCENE)
  localJson && baseMenu.push(storageSceneItem)

  return baseMenu
}

export const redrawFunc = (sceneTree: SceneTree) => {
  const redrawInfo = sceneTree?.uiTree.redrawInfo
  redrawInfo && sceneTree?.uiTree.redrawEvent.emit(redrawInfo)
}
