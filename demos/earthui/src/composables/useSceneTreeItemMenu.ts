import { downloadJson } from "@/utils";
import {
  getCreateSceneObjectType,
  getEditorOption,
  MenuItem,
} from "earthsdk-ui";
import { ESObjectsManager, SceneTree, SceneTreeItem } from "earthsdk3";
import { ElMessage } from "element-plus";
import { getGeoJsonMenuContent } from "./transformToGeoJson";
import { getLiftHeightMenuContent } from "./useliftHeight";
import { getSceneTreeItemConfigMenu } from "./useSceneTreeItemConfigMenu";
import { addNewTreeItem } from "./useSceneTreeMenu";

//右键场景树节点
export const getTreeItemMenuContent = (
  objm: ESObjectsManager,
  sceneTree: SceneTree,
  treeItem: SceneTreeItem,
  showCheckbox: boolean
): MenuItem[] => {
  if (treeItem.type === "Folder") {
    return getFolderTreeItemMenuContent(sceneTree, treeItem, showCheckbox);
  } else {
    return [];
  }
};

/**
 * 文件夹右键
 * @param treeItem
 */
const getFolderTreeItemMenuContent = (
  sceneTree: SceneTree,
  treeItem: SceneTreeItem,
  showCheckbox: boolean
) => {
  const geoJsonMenu = getGeoJsonMenuContent(sceneTree, showCheckbox, treeItem);
  const liftHeightMenu = getLiftHeightMenuContent(
    sceneTree,
    showCheckbox,
    treeItem
  );

  const configMenu = getSceneTreeItemConfigMenu(
    sceneTree,
    showCheckbox,
    treeItem
  );
  const baseItems: Array<MenuItem> = [
    {
      text: "新建文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(sceneTree, treeItem, "Inner");
      },
    },
    {
      text: "新建对象",
      keys: "",
      func: async () => {
        const type = await getCreateSceneObjectType();
        if (!type) return;
        const newTreeItem = sceneTree.createSceneObjectTreeItem(
          type,
          undefined,
          treeItem,
          "Inner"
        );
        if (!newTreeItem) return;
        // sceneTree.uiTree.clearAllSelectedItems();
        // newTreeItem.uiTreeObject.selected = true;
        //TODO:属性树挂载节点
        // objm.propSceneTree = treeItem;
        const { sceneObject } = newTreeItem;
        if (sceneObject && "editing" in sceneObject) {
          sceneObject.editing = true;
        }
        ElMessage.success("创建成功");
      },
    },
    {
      text: "通过 JSON 创建对象",
      keys: "",
      func: async () => {
        const jsonStr = await getEditorOption(JSON.stringify({}), "json");
        if (!jsonStr) return;
        const json = JSON.parse(jsonStr);
        const newTreeItem = sceneTree.createSceneObjectTreeItemFromJson(
          json,
          treeItem,
          "Inner"
        );
        if (!newTreeItem) return;
        // sceneTree.uiTree.clearAllSelectedItems();
        // newTreeItem.uiTreeObject.selected = true;
        //TODO:属性树挂载节点
        // objm.propSceneTree = treeItem;
        const { sceneObject } = newTreeItem;
        if (sceneObject && "editing" in sceneObject) {
          sceneObject.editing = true;
        }
        ElMessage.success("创建成功");
      },
    },
    {
      type: "divider",
    },
    ...configMenu,
    {
      type: "divider",
    },
    {
      ...geoJsonMenu,
    },
    {
      ...liftHeightMenu,
    },

    {
      text: "下载节点 JSON",
      keys: "",
      func: () => {
        const json = treeItem?.json;
        const name = treeItem?.name;
        downloadJson(json, name + ".json");
      },
    },
  ];

  return baseItems;
};

/**
 * 节点对象右键
 * @param treeItem
 */
// const getSceneObjectTreeItemMenuContent = (
//   objm: ESObjectsManager,
//   sceneTree: SceneTree,
//   treeItem: SceneTreeItem,
//   showCheckbox: boolean
// ) => {
//   const geoJsonMenu = getGeoJsonMenuContent(sceneTree, showCheckbox, treeItem);
//   const liftHeightMenu = getLiftHeightMenuContent(
//     sceneTree,
//     showCheckbox,
//     treeItem
//   );

//   const baseItems: Array<MenuItem> = [
//     {
//       text: "定位",
//       keys: "",
//       func: () => {
//         flyTo(treeItem);
//       },
//     },
//     {
//       text: "保存观察视角",
//       keys: "",
//       func: () => {
//         saveParms(treeItem);
//       },
//     },
//     {
//       type: "divider",
//     },
//     {
//       text: "剪切",
//       keys: "",
//       func: () => {
//         checkedItems = [...sceneTree.selectedItems];
//         if (!checkedItems.includes(treeItem)) {
//           checkedItems.push(treeItem);
//         }
//       },
//     },
//     {
//       text: "克隆",
//       keys: "",
//       func: () => {
//         if (!treeItem.parent) {
//           console.warn(`父节点不存在，无法克隆！`);
//           return;
//         }

//         if (!treeItem.parent.children) {
//           console.error(
//             `父节点的children属性必须存在，否则当前节点从哪里来？treeItem.parent.children`
//           );
//           return;
//         }
//         const cloneTreeItem = treeItem.clone();
//         if (!cloneTreeItem) {
//           console.warn(`节点克隆失败！`);
//           return;
//         }
//         treeItem.parent.children.push(cloneTreeItem);
//       },
//     },
//     {
//       text: "删除",
//       keys: "",
//       func: () => {
//         clickDelete();
//       },
//     },
//     {
//       type: "divider",
//     },
//     {
//       text: "重命名",
//       keys: "",
//       func: () => {
//         treeItem.nameEditing = true;
//       },
//     },
//     {
//       text: "编辑对象json",
//       keys: "",
//       func: () => {
//         editSceneObjShow.value = false;
//         const sceneObject = treeItem.sceneObject;
//         if (!sceneObject) return ElMessage.warning("当前节点没有对象");
//         editSceneObj.value = sceneObject;
//         setTimeout(() => {
//           editSceneObjShow.value = true;
//         }, 100);
//       },
//     },
//     {
//       text: "复制对象json",
//       keys: "",
//       func: () => {
//         const jsonStr = treeItem.sceneObject?.json;
//         if (jsonStr) {
//           copyClipboard(JSON.stringify(jsonStr));
//         }
//       },
//     },
//     {
//       text: "下载配置",
//       keys: "",
//       func: () => {
//         const json = treeItem.sceneObject?.json;
//         const name = treeItem.sceneObject?.name;
//         saveAs(json, name);
//       },
//     },
//     {
//       type: "divider",
//     },
//     {
//       text: "属性",
//       keys: "",
//       func: () => {
//         xbsjEarthUi.propSceneTree = treeItem;
//       },
//     },
//     {
//       text: "完整属性",
//       keys: "",
//       func: () => {
//         propIsShow.value = true;
//         xbsjEarthUi.propUiTreeManager.sceneObject = treeItem.sceneObject;
//       },
//     },
//   ];
//   const pasteList: Array<menuContentType> = [
//     {
//       text: "粘贴到节点下方",
//       keys: "",
//       func: () => {
//         fatherItem = treeItem;
//         if (Tree.canMoveToTreeItems(checkedItems, fatherItem, "after")) {
//           Tree.moveToTreeItems(checkedItems, fatherItem, "after");
//           checkedItems = null;
//         } else {
//           checkedItems = null;
//         }
//       },
//     },
//     {
//       text: "粘贴到节点上方",
//       keys: "",
//       func: () => {
//         fatherItem = treeItem;
//         if (Tree.canMoveToTreeItems(checkedItems, fatherItem, "before")) {
//           Tree.moveToTreeItems(checkedItems, fatherItem, "before");
//           checkedItems = null;
//         } else {
//           checkedItems = null;
//         }
//       },
//     },
//     {
//       text: "粘贴到节点内部",
//       keys: "",
//       func: () => {
//         fatherItem = treeItem;
//         if (Tree.canMoveToTreeItems(checkedItems, fatherItem, "inner")) {
//           Tree.moveToTreeItems(checkedItems, fatherItem, "inner");
//           checkedItems = null;
//         } else {
//           checkedItems = null;
//         }
//       },
//     },
//   ];
//   if (checkedItems) {
//     pasteList.forEach((item) => {
//       baseItems.splice(-8, 0, item);
//     });
//   }
//   const enditingList = {
//     text: "编辑",
//     keys: "",
//     func: () => {
//       let dispose: any;
//       if (treeItem.sceneObject) {
//         if ("editing" in treeItem.sceneObject) {
//           treeItem.sceneObject.editing = true;
//           Message.loading({
//             id: "xxx",
//             content:
//               "1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换",
//           });
//           //@ts-ignore
//           dispose = treeItem.sceneObject.editingChanged.disposableOnce(
//             (res: boolean) => {
//               if (!res) {
//                 Message.remove("xxx");
//                 dispose();
//                 dispose = undefined;
//               }
//             }
//           );
//         }
//       }
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       "editing" in treeItem.sceneObject &&
//       !(treeItem.sceneObject instanceof ESGeoJson)
//     ) {
//       //ESGeoJson有editing属性但是不能被编辑
//       if (
//         !(treeItem.sceneObject instanceof ES3DTileset) ||
//         (treeItem.sceneObject instanceof ES3DTileset &&
//           treeItem.sceneObject.supportEdit)
//       ) {
//         baseItems.splice(1, 0, enditingList);
//       }
//     }
//   }
//   const Geojson = {
//     text: "转为ES点线面对象",
//     keys: "",
//     func: () => {
//       if (treeItem.sceneObject) {
//         switch (treeItem.sceneObject.typeName) {
//           case "ESGeoJson":
//             // 处理ESGeoJson
//             {
//               const sceneObject = treeItem.sceneObject as ESGeoJson;
//               const url = sceneObject.url;
//               if (!url) {
//                 ElMessage.error("此场景对象不存在url属性，请检查");
//                 return;
//               }
//               if (typeof url === "string") {
//                 getNoToken(url)
//                   .then((res: any) => {
//                     itemGeoJsonTOESObjects(res);
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                     ElMessage.error(`请求失败，请检查！${error}`);
//                   });
//               } else {
//                 itemGeoJsonTOESObjects(url);
//               }
//             }
//             break;
//           // 处理Kml
//           case "ESKml":
//             {
//               const sceneObject = treeItem.sceneObject as ESKml;
//               let input = sceneObject.uri ? sceneObject.uri : sceneObject.data;
//               kmlToESObjects(input);
//             }
//             break;

//           default:
//             break;
//         }
//       }
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       treeItem.sceneObject instanceof ESGeoJson ||
//       treeItem.sceneObject instanceof ESKml
//     ) {
//       baseItems.splice(2, 0, Geojson);
//     }
//   }

//   const copyUrl = {
//     text: "复制服务地址",
//     keys: "",
//     func: () => {
//       if (treeItem.sceneObject) {
//         if ("url" in treeItem.sceneObject) {
//           const url = treeItem.sceneObject.url as string;
//           if (url.length > 0) {
//             copyClipboard(url);
//           } else {
//             ElMessage.error("url地址为空");
//           }
//         }
//       }
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       treeItem.sceneObject instanceof ESImageryLayer ||
//       treeItem.sceneObject instanceof ES3DTileset ||
//       treeItem.sceneObject instanceof ESTerrainLayer
//     ) {
//       baseItems.splice(1, 0, copyUrl);
//     }
//   }
//   const openCesium = {
//     text: "加载Cesium代码",
//     keys: "",
//     func: () => {
//       if (treeItem.sceneObject) {
//         popTreeItem.value = treeItem.sceneObject;
//       }
//     },
//   };
//   if (
//     treeItem.sceneObject &&
//     xbsjEarthUi.activeViewer?.typeName == "ESCesiumViewer"
//   ) {
//     if (
//       treeItem.sceneObject instanceof ESImageryLayer ||
//       treeItem.sceneObject instanceof ES3DTileset ||
//       treeItem.sceneObject instanceof ESTerrainLayer
//     ) {
//       baseItems.splice(1, 0, openCesium);
//     }
//   }
//   const liftHeight = {
//     text: "抬升高度",
//     keys: "",
//     func: () => {
//       liftHeightTreeItem.value = treeItem;
//       liftHeightType.value = "node";
//       //@ts-ignore
//       liftHeightName.value = treeItem.sceneObject.name;
//       liftHeightShow.value = false;
//       setTimeout(() => {
//         liftHeightShow.value = true;
//       }, 100);
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       treeItem.sceneObject instanceof ESObjectWithLocation ||
//       treeItem.sceneObject instanceof ESGeoVector
//     ) {
//       baseItems.splice(8, 0, liftHeight);
//     }
//   }
//   const set3DTileasetStyle = {
//     text: "样式设置",
//     keys: "",
//     func: () => {
//       setStyleTreeItem.value = treeItem;
//       setStyleShow.value = false;
//       setTimeout(() => {
//         setStyleShow.value = true;
//       }, 100);
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (treeItem.sceneObject instanceof ES3DTileset) {
//       baseItems.splice(13, 0, set3DTileasetStyle);
//     }
//   }
//   const setMaterial = {
//     text: "材质替换",
//     keys: "",
//     func: () => {
//       setStyleTreeItem.value = treeItem;
//       materialReplaceShow.value = false;
//       setTimeout(() => {
//         materialReplaceShow.value = true;
//       }, 100);
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       treeItem.sceneObject instanceof ES3DTileset &&
//       xbsjEarthUi.activeViewer instanceof ESUeViewer
//     ) {
//       // if (treeItem.sceneObject instanceof ES3DTileset) {
//       baseItems.splice(13, 0, setMaterial);
//     }
//   }
//   const ESObjToGeojson = {
//     text: "导出为Geojson文件",
//     keys: "",
//     func: async () => {
//       const a = searchGeoObjsValues(xbsjEarthUi, [treeItem.sceneObject]);
//       const num = locationAndVectorNumber([treeItem.sceneObject]);
//       try {
//         ElMessage.warning("正在另存为..");
//         const handle = await saveFileHandle(
//           "geoJson",
//           `${treeItem.name}-geoJson场景对象`
//         );
//         if (!handle) return;
//         const jsonStr = JSON.stringify(a, undefined, "    ");
//         await save(handle, jsonStr);
//         if (num > 0) {
//           ElMessage.success(`另存成功${num}个对象!`);
//         } else {
//           ElMessage.warning(`导出文件为空!`);
//         }
//       } catch (error) {
//         ElMessage.error(`另存失败! error: ${error}`);
//       }
//     },
//   };
//   if (treeItem.sceneObject) {
//     if (
//       treeItem.sceneObject instanceof ESObjectWithLocation ||
//       treeItem.sceneObject instanceof ESGeoVector
//     ) {
//       baseItems.splice(8, 0, ESObjToGeojson);
//     }
//   }

//   if (treeItem.sceneObject) {
//     if (
//       !(xbsjEarthUi.activeViewer instanceof ESUeViewer) &&
//       (treeItem.sceneObject instanceof ES3DTileset ||
//         treeItem.sceneObject instanceof ESImageryLayer)
//     ) {
//       const setSplitDirection = getSplitDirectionList(treeItem.sceneObject);
//       setSplitDirection.forEach((item: any) => {
//         baseItems.push(item);
//       });
//     }
//   }
//   menuContent.value = baseItems;
// };
