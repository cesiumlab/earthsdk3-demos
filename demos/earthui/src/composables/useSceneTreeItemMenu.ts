import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { copyClipboard, downloadJson } from '@/utils'
import { getCreateSceneObjectType, getEditorOption, MenuItem, messageLoading } from 'earthsdk-ui'
import {
  ES3DTileset,
  ESGeoJson,
  ESImageryLayer,
  ESJSplitDirectionType,
  ESTerrainLayer,
  ESVisualObject,
  SceneTree,
  SceneTreeItem
} from 'earthsdk3'
import { ElMessage } from 'element-plus'
import { calcFlyToParam } from './calcFlyToParam'
import { getGeoJsonMenuContent } from './transformToGeoJson'
import { getLiftHeightMenuContent } from './useliftHeight'
import { getSceneObjectsForMenu } from './useSceneTreeItem'
import { getSceneTreeItemConfigMenu, getSceneTreeItemsConfigMenu } from './useSceneTreeItemConfigMenu'
import { addNewTreeItem } from './useSceneTreeMenu'
import { ESUeViewer } from 'earthsdk3-ue'

//右键场景树节点
export const getTreeItemMenuContent = (
  objm: XbsjEarthUi,
  sceneTree: SceneTree,
  treeItem: SceneTreeItem,
): MenuItem[] => {
  if (sceneTree.selectedItems.length === 1) {
    // 单选
    if (treeItem.type === 'Folder') {
      return getFolderTreeItemMenuContent(objm, sceneTree, treeItem)
    } else {
      return getSceneObjectTreeItemMenuContent(objm, sceneTree, treeItem)
    }
  } else {
    //多选
    return getTreeItemsMenuContent(sceneTree);
  }
}

/**
 * 右键多选
 */

const getTreeItemsMenuContent = (
  sceneTree: SceneTree
) => {
  const { sceneObjects, parentSceneTreeItems, tag } = getSceneObjectsForMenu(sceneTree);
  const geoJsonMenu = getGeoJsonMenuContent(sceneObjects, tag);
  const liftHeightMenu = getLiftHeightMenuContent(sceneObjects, tag);
  const configMenu = getSceneTreeItemsConfigMenu(parentSceneTreeItems);

  const baseItems: Array<MenuItem> = [
    ...configMenu,
    {
      type: 'divider'
    },
    {
      ...liftHeightMenu
    },
    {
      ...geoJsonMenu
    },
    {
      text: '下载选中对象 JSON',
      keys: '',
      func: () => {
        const jsonList = sceneObjects.map(sceneObj => sceneObj.json!);
        // const jsonStr = JSON.stringify(jsonList);
        downloadJson(jsonList, 'sceneObjects.json', true)
      }
    }
  ]
  return baseItems
}

/**
 * 文件夹右键 单选
 * @param treeItem
 */
const getFolderTreeItemMenuContent = (
  objm: XbsjEarthUi,
  sceneTree: SceneTree,
  treeItem: SceneTreeItem,
) => {

  const { sceneObjects, parentSceneTreeItems, tag } = getSceneObjectsForMenu(sceneTree);
  const geoJsonMenu = getGeoJsonMenuContent(sceneObjects, tag);
  const liftHeightMenu = getLiftHeightMenuContent(sceneObjects, tag);
  const configMenu = getSceneTreeItemConfigMenu(treeItem, parentSceneTreeItems, tag);

  const baseItems: Array<MenuItem> = [
    {
      text: '新建对象',
      keys: '',
      func: async () => {
        const type = await getCreateSceneObjectType()
        if (!type) return
        const newTreeItem = sceneTree.createSceneObjectTreeItem(type, undefined, treeItem, 'Inner')
        if (!newTreeItem) return

        sceneTree.uiTree.clearAllSelectedItems();
        newTreeItem.uiTreeObject.selected = true;

        const { sceneObject } = newTreeItem
        if (sceneObject && 'editing' in sceneObject) {
          sceneObject.editing = true
        }
        ElMessage.success('创建成功')
      }
    },
    {
      text: '新建文件夹',
      keys: '',
      func: () => {
        addNewTreeItem(sceneTree, treeItem, 'Inner')
      }
    },
    {
      text: '通过 JSON 创建对象',
      keys: '',
      func: async () => {
        const jsonStr = await getEditorOption(JSON.stringify({}), 'json')
        if (!jsonStr) return
        const json = JSON.parse(jsonStr)
        const newTreeItem = sceneTree.createSceneObjectTreeItemFromJson(json, treeItem, 'Inner')
        if (!newTreeItem) return
        sceneTree.uiTree.clearAllSelectedItems();
        newTreeItem.uiTreeObject.selected = true;

        const { sceneObject } = newTreeItem
        if (sceneObject && 'editing' in sceneObject) {
          sceneObject.editing = true
        }
        ElMessage.success('创建成功')
      }
    },
    {
      type: 'divider'
    },
    ...configMenu,
    {
      type: 'divider'
    },
    {
      ...geoJsonMenu
    },
    {
      ...liftHeightMenu
    },
    {
      text: '下载节点 JSON',
      keys: '',
      func: () => {
        const json = treeItem?.json
        const name = treeItem?.name
        downloadJson(json, name + '.json', true)
      }
    }
  ]

  return baseItems
}

/**
 * 节点对象右键 单选
 * @param treeItem
 */
const getSceneObjectTreeItemMenuContent = (
  objm: XbsjEarthUi,
  sceneTree: SceneTree,
  treeItem: SceneTreeItem
) => {
  const { sceneObjects, parentSceneTreeItems, tag } = getSceneObjectsForMenu(sceneTree);
  const geoJsonMenu = getGeoJsonMenuContent(sceneObjects, tag)
  const liftHeightMenu = getLiftHeightMenuContent(sceneObjects, tag)
  const configMenu = getSceneTreeItemConfigMenu(treeItem, parentSceneTreeItems, tag)

  const baseItems: Array<MenuItem> = [
    {
      text: '定位',
      keys: '',
      func: () => {
        const sceneObject = treeItem.sceneObject
        if (!sceneObject || !Reflect.has(sceneObject, 'flyTo'))
          return ElMessage.warning('不支持定位')
        //@ts-ignore
        sceneObject.flyTo()
        ElMessage.success('已定位')
      }
    },
    {
      text: '保存观察视角',
      keys: '',
      func: () => {
        calcFlyToParam(objm, treeItem)
      }
    },
    {
      ...liftHeightMenu
    },
    {
      type: 'divider'
    },
    ...configMenu,
    {
      type: 'divider'
    },

    {
      text: '编辑对象 JSON',
      keys: '',
      func: async () => {
        try {
          const sceneObject = treeItem.sceneObject;
          if (!sceneObject) return ElMessage.warning('当前节点没有对象');
          const json = sceneObject.json;
          const newJsonStr = await getEditorOption(JSON.stringify(json), 'json');
          if (!newJsonStr) return;
          sceneObject.json = JSON.parse(newJsonStr);
          ElMessage.success('编辑成功');
        } catch (error) {
          console.error(error);
          ElMessage.error('编辑失败');
        }
      }
    },
    {
      text: '复制对象 JSON',
      keys: '',
      func: async () => {
        const sceneObject = treeItem.sceneObject
        if (!sceneObject) return ElMessage.warning('当前节点没有对象')
        const json = sceneObject.json
        const flag = await copyClipboard(JSON.stringify(json))
        if (flag) {
          ElMessage.success('复制成功')
        } else {
          ElMessage.warning('复制异常')
        }
      }
    },
    {
      text: '下载对象 JSON',
      keys: '',
      func: () => {
        const sceneObject = treeItem.sceneObject
        if (!sceneObject) return ElMessage.warning('当前节点没有对象')
        const json = sceneObject.json
        const name = sceneObject.name ?? '未命名'
        downloadJson(json, name + '.json', true)
      }
    },
    {
      ...geoJsonMenu
    },
    {
      type: 'divider'
    },
    {
      text: '属性',
      keys: '',
      func: () => { objm.propSceneTree = treeItem; }
    }
  ]

  const sceneObject = treeItem.sceneObject;

  const copyUrl = {
    text: '复制服务地址',
    keys: '',
    func: async () => {
      if (sceneObject) {
        if ('url' in sceneObject) {
          const url = sceneObject.url as string
          if (url.length > 0) {
            const flag = await copyClipboard(JSON.stringify(url))
            if (flag) {
              ElMessage.success('复制成功')
            } else {
              ElMessage.warning('复制异常')
            }
          } else {
            ElMessage.error('url地址为空')
          }
        }
      }
    }
  }
  if (sceneObject) {
    if (
      sceneObject instanceof ESImageryLayer ||
      sceneObject instanceof ES3DTileset ||
      sceneObject instanceof ESTerrainLayer
    ) {
      baseItems.splice(1, 0, copyUrl)
    }
  }

  const enditingItem = {
    text: "编辑",
    keys: "",
    func: () => {
      if (sceneObject) {
        if (Reflect.has(sceneObject, 'editing') && Reflect.has(sceneObject, 'editingChanged')) {
          (sceneObject as ESVisualObject).editing = true;
          const close = messageLoading("1.双击左键或 ESC 键退出编辑  2.空格键切换编辑方式");
          const dispose = (sceneObject as ESVisualObject).editingChanged.donce((res: boolean) => {
            if (!res) {
              close();
              dispose();
            }
          });
        }
      }
    },
  };
  if (sceneObject) {
    if ("editing" in sceneObject && !(sceneObject instanceof ESGeoJson) && !(sceneObject instanceof ESImageryLayer) && !(sceneObject instanceof ESTerrainLayer)) {
      //ESGeoJson有editing属性但是不能被编辑
      if (!(sceneObject instanceof ES3DTileset) || (sceneObject instanceof ES3DTileset && sceneObject.supportEdit)) {

        baseItems.splice(1, 0, enditingItem);
      }
    }
  }

  // const Geojson = {
  //   text: "转为ES点线面对象",
  //   keys: "",
  //   func: () => {
  //     if (treeItem.sceneObject) {
  //       switch (treeItem.sceneObject.typeName) {
  //         case "ESGeoJson":
  //           // 处理ESGeoJson
  //           {
  //             const sceneObject = treeItem.sceneObject as ESGeoJson;
  //             const url = sceneObject.url;
  //             if (!url) {
  //               ElMessage.error("此场景对象不存在url属性，请检查");
  //               return;
  //             }
  //             if (typeof url === "string") {
  //               getNoToken(url)
  //                 .then((res: any) => {
  //                   itemGeoJsonTOESObjects(res);
  //                 })
  //                 .catch((error) => {
  //                   console.log(error);
  //                   ElMessage.error(`请求失败，请检查！${error}`);
  //                 });
  //             } else {
  //               itemGeoJsonTOESObjects(url);
  //             }
  //           }
  //           break;
  //         // 处理Kml
  //         case "ESKml":
  //           {
  //             const sceneObject = treeItem.sceneObject as ESKml;
  //             let input = sceneObject.uri ? sceneObject.uri : sceneObject.data;
  //             kmlToESObjects(input);
  //           }
  //           break;

  //         default:
  //           break;
  //       }
  //     }
  //   },
  // };
  // if (treeItem.sceneObject) {
  //   if (
  //     treeItem.sceneObject instanceof ESGeoJson ||
  //     treeItem.sceneObject instanceof ESKml
  //   ) {
  //     baseItems.splice(2, 0, Geojson);
  //   }
  // }


  // const openCesium = {
  //   text: "加载Cesium代码",
  //   keys: "",
  //   func: () => {},
  // };
  // if (
  //   treeItem.sceneObject &&
  //   xbsjEarthUi.activeViewer?.typeName == "ESCesiumViewer"
  // ) {
  //   if (
  //     treeItem.sceneObject instanceof ESImageryLayer ||
  //     treeItem.sceneObject instanceof ES3DTileset ||
  //     treeItem.sceneObject instanceof ESTerrainLayer
  //   ) {
  //     baseItems.splice(1, 0, openCesium);
  //   }
  // }


  // const set3DTileasetStyle = {
  //   text: "样式设置",
  //   keys: "",
  //   func: () => {
  //     setStyleTreeItem.value = treeItem;
  //     setStyleShow.value = false;
  //     setTimeout(() => {
  //       setStyleShow.value = true;
  //     }, 100);
  //   },
  // };
  // if (treeItem.sceneObject) {
  //   if (treeItem.sceneObject instanceof ES3DTileset) {
  //     baseItems.splice(13, 0, set3DTileasetStyle);
  //   }
  // }


  // const setMaterial = {
  //   text: "材质替换",
  //   keys: "",
  //   func: () => {
  //     setStyleTreeItem.value = treeItem;
  //     materialReplaceShow.value = false;
  //     setTimeout(() => {
  //       materialReplaceShow.value = true;
  //     }, 100);
  //   },
  // };
  // if (treeItem.sceneObject) {
  //   if (
  //     treeItem.sceneObject instanceof ES3DTileset &&
  //     xbsjEarthUi.activeViewer instanceof ESUeViewer
  //   ) {
  //     // if (treeItem.sceneObject instanceof ES3DTileset) {
  //     baseItems.splice(13, 0, setMaterial);
  //   }
  // }


  //卷帘分割
  if (sceneObject) {
    if (!(objm.activeViewer instanceof ESUeViewer)
      && (sceneObject instanceof ES3DTileset || sceneObject instanceof ESImageryLayer)) {
      const setSplitDirection = getSplitDirectionItems(objm, sceneObject);
      setSplitDirection.forEach((item) => { baseItems.push(item); });
    }
  }

  return baseItems
}


/**
 * 卷帘分割
 * @param sceneObject
 */
const getSplitDirectionItems = (xbsjEarthUi: XbsjEarthUi, sceneObject: ES3DTileset | ESImageryLayer) => {
  const actions: { [key: string]: any } = {
    'LEFT': {
      text: '向左分割', next: ['RIGHT', 'NONE']
    },
    'RIGHT': {
      text: '向右分割', next: ['LEFT', 'NONE']
    },
    'NONE': {
      text: '不分割', next: ['LEFT', 'RIGHT']
    }
  }

  const current = sceneObject.splitDirection
  const availableActions: MenuItem[] = actions[current].next.map((dir: string) => ({
    text: actions[dir].text,
    keys: '',
    func: () => {
      if (!xbsjEarthUi.activeViewer || !xbsjEarthUi.activeViewer.rollerShutter) {
        return ElMessage.warning('请先在 分析 中开启卷帘分割功能')
      }
      sceneObject.splitDirection = dir as ESJSplitDirectionType
    }
  }))
  return availableActions
}
