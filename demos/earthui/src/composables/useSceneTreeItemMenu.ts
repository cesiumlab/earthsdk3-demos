import { copyClipboard, downloadJson } from "@/utils";
import {
  getCreateSceneObjectType,
  getEditorOption,
  MenuItem,
} from "earthsdk-ui";
import {
  ES3DTileset,
  ESImageryLayer,
  ESObjectsManager,
  ESTerrainLayer,
  SceneTree,
  SceneTreeItem,
} from "earthsdk3";
import { ElMessage } from "element-plus";
import { getGeoJsonMenuContent } from "./transformToGeoJson";
import { getLiftHeightMenuContent } from "./useliftHeight";
import { getSceneTreeItemConfigMenu } from "./useSceneTreeItemConfigMenu";
import { addNewTreeItem } from "./useSceneTreeMenu";
import { calcFlyToParam } from "./calcFlyToParam";

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
    return getSceneObjectTreeItemMenuContent(
      objm,
      sceneTree,
      treeItem,
      showCheckbox
    );
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
const getSceneObjectTreeItemMenuContent = (
  objm: ESObjectsManager,
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
      text: "定位",
      keys: "",
      func: () => {
        const sceneObject = treeItem.sceneObject;
        if (!sceneObject || !Reflect.has(sceneObject, "flyTo"))
          return ElMessage.warning("不支持定位");
        //@ts-ignore
        sceneObject.flyTo();
        ElMessage.success("已定位");
      },
    },
    {
      text: "保存观察视角",
      keys: "",
      func: () => {
        calcFlyToParam(objm, treeItem);
      },
    },
    {
      ...liftHeightMenu,
    },
    {
      type: "divider",
    },
    ...configMenu,
    {
      type: "divider",
    },

    {
      text: "编辑对象 JSON",
      keys: "",
      func: async () => {
        try {
          const sceneObject = treeItem.sceneObject;
          if (!sceneObject) return ElMessage.warning("当前节点没有对象");
          const json = sceneObject.json;
          const newJsonStr = await getEditorOption(
            JSON.stringify(json),
            "json"
          );
          if (!newJsonStr) return;
          sceneObject.json = JSON.parse(newJsonStr);
          ElMessage.success("编辑成功");
        } catch (error) {
          console.error(error);
          ElMessage.error("编辑失败");
        }
      },
    },
    {
      text: "复制对象 JSON",
      keys: "",
      func: async () => {
        const sceneObject = treeItem.sceneObject;
        if (!sceneObject) return ElMessage.warning("当前节点没有对象");
        const json = sceneObject.json;
        const flag = await copyClipboard(JSON.stringify(json));
        if (flag) {
          ElMessage.success("复制成功");
        } else {
          ElMessage.warning("复制异常");
        }
      },
    },
    {
      text: "下载对象 JSON",
      keys: "",
      func: () => {
        const sceneObject = treeItem.sceneObject;
        if (!sceneObject) return ElMessage.warning("当前节点没有对象");
        const json = sceneObject.json;
        const name = sceneObject.name ?? "未命名";
        downloadJson(json, name + ".json", true);
      },
    },
    {
      ...geoJsonMenu,
    },
    {
      type: "divider",
    },
    {
      text: "属性(TODO)",
      keys: "",
      func: () => {
        console.log(treeItem.sceneObject);
      },
    },
    {
      text: "完整属性(TODO)",
      keys: "",
      func: () => {
        console.log(treeItem.sceneObject);
      },
    },
  ];

  const copyUrl = {
    text: "复制服务地址",
    keys: "",
    func: async () => {
      if (treeItem.sceneObject) {
        if ("url" in treeItem.sceneObject) {
          const url = treeItem.sceneObject.url as string;
          if (url.length > 0) {
            const flag = await copyClipboard(JSON.stringify(url));
            if (flag) {
              ElMessage.success("复制成功");
            } else {
              ElMessage.warning("复制异常");
            }
          } else {
            ElMessage.error("url地址为空");
          }
        }
      }
    },
  };
  if (treeItem.sceneObject) {
    if (
      treeItem.sceneObject instanceof ESImageryLayer ||
      treeItem.sceneObject instanceof ES3DTileset ||
      treeItem.sceneObject instanceof ESTerrainLayer
    ) {
      baseItems.splice(1, 0, copyUrl);
    }
  }

  // const enditingList = {
  //   text: "编辑",
  //   keys: "",
  //   func: () => {
  //     let dispose: any;
  //     if (treeItem.sceneObject) {
  //       if ("editing" in treeItem.sceneObject) {
  //         treeItem.sceneObject.editing = true;
  //         Message.loading({
  //           id: "xxx",
  //           content:
  //             "1. 双击鼠标左键或点击ESC键退出编辑2. 点击空格键进行编辑方式的切换",
  //         });
  //         //@ts-ignore
  //         dispose = treeItem.sceneObject.editingChanged.disposableOnce(
  //           (res: boolean) => {
  //             if (!res) {
  //               Message.remove("xxx");
  //               dispose();
  //               dispose = undefined;
  //             }
  //           }
  //         );
  //       }
  //     }
  //   },
  // };
  // if (treeItem.sceneObject) {
  //   if (
  //     "editing" in treeItem.sceneObject &&
  //     !(treeItem.sceneObject instanceof ESGeoJson)
  //   ) {
  //     //ESGeoJson有editing属性但是不能被编辑
  //     if (
  //       !(treeItem.sceneObject instanceof ES3DTileset) ||
  //       (treeItem.sceneObject instanceof ES3DTileset &&
  //         treeItem.sceneObject.supportEdit)
  //     ) {
  //       baseItems.splice(1, 0, enditingList);
  //     }
  //   }
  // }
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

  // if (treeItem.sceneObject) {
  //   if (
  //     !(xbsjEarthUi.activeViewer instanceof ESUeViewer) &&
  //     (treeItem.sceneObject instanceof ES3DTileset ||
  //       treeItem.sceneObject instanceof ESImageryLayer)
  //   ) {
  //     const setSplitDirection = getSplitDirectionList(treeItem.sceneObject);
  //     setSplitDirection.forEach((item: any) => {
  //       baseItems.push(item);
  //     });
  //   }
  // }

  return baseItems;
};
