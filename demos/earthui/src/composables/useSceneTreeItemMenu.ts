import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { copyClipboard, downloadJson, getCurrentDateTime, getUuid } from '@/utils'
import { FieldConfigItem, getCreateSceneObjectType, getEditorOption, getTilesetStyle, MenuItem, messageLoading, StyleData, StyleRule } from 'earthsdk-ui'
import { ES3DTileset, ESGeoJson, ESImageryLayer, ESJFeatureStyleType, ESJSplitDirectionType, ESTerrainLayer, ESVisualObject, SceneTree, SceneTreeItem } from 'earthsdk3'
import { ESCesiumViewer, ESKml, getCzmCode } from 'earthsdk3-cesium'
import { ESUeViewer } from 'earthsdk3-ue'
import { ElMessage } from 'element-plus'
import { calcFlyToParam } from './calcFlyToParam'
import { geojsonToESObiects } from './geojsonToESObiects'
import { kmlToESObjects } from './kmlToESObjects'
import { getGeoJsonMenuContent } from './objectsToGeoJson'
import { getLiftHeightMenuContent } from './useliftHeight'
import { getSceneObjectsForMenu } from './useSceneTreeItem'
import { getSceneTreeItemConfigMenu, getSceneTreeItemsConfigMenu } from './useSceneTreeItemConfigMenu'
import { addNewTreeItem } from './useSceneTreeMenu'
import { cesiumCodeLoader } from './funcCesiumCode'
import { materialReplaceEditor } from './funcMaterialReplace'

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
          if (url) {
            const flag = await copyClipboard(url)
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

  const geoJsonKmlItem = {
    text: "转换为点、线、面对象",
    keys: "",
    func: () => {
      if (sceneObject) {
        switch (sceneObject.typeName) {
          case "ESGeoJson":
            {
              const sceneObject = treeItem.sceneObject as ESGeoJson;
              const url = sceneObject.url;
              if (!url) {
                ElMessage.error("此场景对象不存在url属性，请检查");
                return;
              }
              geojsonToESObiects(objm, url);
            }
            break;
          case "ESKml":
            {
              const sceneObject = treeItem.sceneObject as ESKml;
              let input = sceneObject.uri ? sceneObject.uri : sceneObject.data;
              kmlToESObjects(objm, input);
            }
            break;
          default:
            break;
        }
      }
    },
  };

  if (sceneObject && (sceneObject instanceof ESGeoJson || sceneObject instanceof ESKml)) {
    baseItems.splice(2, 0, geoJsonKmlItem);
  }



  const openCesium = {
    text: "Cesium代码",
    keys: "",
    func: () => {
      if (sceneObject && objm.activeViewer instanceof ESCesiumViewer) {
        if (
          sceneObject instanceof ESImageryLayer
          || sceneObject instanceof ES3DTileset
          || sceneObject instanceof ESTerrainLayer
        ) {
          const code = getCzmCode(sceneObject);
          code && cesiumCodeLoader(code);
        }
      }
    },
  };
  if (sceneObject && objm.activeViewer instanceof ESCesiumViewer) {
    if (
      sceneObject instanceof ESImageryLayer
      || sceneObject instanceof ES3DTileset
      || sceneObject instanceof ESTerrainLayer
    ) {
      // objm.activeViewer.container
      baseItems.splice(1, 0, openCesium);
    }
  }


  const set3DTilesetStyle = {
    text: "3DTile 样式设置",
    keys: "",
    func: async () => {
      if (sceneObject && sceneObject instanceof ES3DTileset) {

        //通过函数获取featureType
        const featureTypes = await sceneObject.getFeatureTable();

        let historyRules: StyleData[] = [];
        let fields: FieldConfigItem[] = [];
        let initialRule: StyleRule[] = [];

        if (featureTypes && featureTypes.length > 0) {
          fields = featureTypes.map(e => [e.key, e.key, e.type] as FieldConfigItem);
        }

        const extras = sceneObject.extras as any;
        if (extras && 'xbsjFetureStyles' in extras) {
          historyRules = JSON.parse(JSON.stringify(extras.xbsjFetureStyles));
          initialRule = historyRules[historyRules.length - 1].code;
        }

        const config = { historyRules, fields, initialRule }
        const style = await getTilesetStyle(config);
        //存
        if (style) {
          sceneObject.setFeatureStyle(style as ESJFeatureStyleType);

          const viewer = objm.activeViewer
          if (!viewer) return;
          const capture = await viewer.capture()
          const styleData: StyleData = {
            id: getUuid(),
            name: getCurrentDateTime(),
            code: style,
            thumbnail: capture ?? '' // 使用已获取的 capture
          }

          const newHistoryRules = [...historyRules, styleData];
          if (sceneObject.extras) {
            sceneObject.extras = {
              //@ts-ignore
              ...sceneObject.extras,
              xbsjFetureStyles: newHistoryRules
            }
          } else {
            //@ts-ignore
            sceneObject.extras = {
              xbsjFetureStyles: newHistoryRules
            }
          }
        }

      }
    },
  };
  if (sceneObject && sceneObject instanceof ES3DTileset) {
    baseItems.splice(2, 0, set3DTilesetStyle);
    baseItems.splice(3, 0, {
      text: "重置 3DTile 样式",
      keys: "",
      func: () => {
        if (sceneObject && sceneObject instanceof ES3DTileset) {
          sceneObject.resetFeatureStyle();
        }
      }
    }
    );
  }


  const setMaterial = {
    text: "材质替换",
    keys: "",
    func: async () => {
      if (
        sceneObject && sceneObject instanceof ES3DTileset
        && objm.activeViewer instanceof ESUeViewer
      ) {
        let close: Function | null = messageLoading('正在获取材质信息...')
        try {
          const ueMaterialList = await objm.activeViewer.getTilesetMaterialIDList()
          const nameList = await sceneObject.getMaterialNameList() as string[];
          if (
            nameList && nameList.length > 0
            && ueMaterialList && ueMaterialList.length > 0
          ) {
            const materialList = nameList.map((name) => {
              return {
                key: name,
                value: (sceneObject.materialOverrideMap ? (sceneObject.materialOverrideMap as any)[name] : undefined) as string | undefined,
                select: false
              }
            })
            close && close() && (close = null);
            const res = await materialReplaceEditor(materialList ?? [], ueMaterialList ?? []);
            res && (sceneObject.materialOverrideMap = res);
            ElMessage.success('已替换材质信息');
          } else {
            close && close() && (close = null);
            ElMessage.warning('材质信息缺失');
          }
        } catch (error) {
          close && close() && (close = null);
          console.log(error)
          ElMessage.warning('未知错误，请检查错误信息')
        }
      }
    },
  };
  if (
    sceneObject
    && sceneObject instanceof ES3DTileset
    && objm.activeViewer instanceof ESUeViewer
  ) {
    baseItems.splice(4, 0, setMaterial);
  }


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
