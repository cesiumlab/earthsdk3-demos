//右键场景树空白区域

import { localStorageKey } from "@/constants";
import { downloadJson } from "@/utils";
import dayjs from "dayjs";
import {
  getCreateSceneObjectType,
  getEditorOption,
  MenuItem,
} from "earthsdk-ui";
import {
  ESObjectsManager,
  SceneTree,
  SceneTreeItem,
  TreeItemInsertFlag,
} from "earthsdk3";
import { ElMessage, ElMessageBox } from "element-plus";
import { transformToGeoJson } from "./transformToGeoJson";
import { defaultLiftHeightFunc } from "./useliftHeight";

//添加文件夹
const addNewTreeItem = (
  sceneTree: SceneTree,
  treeItem?: SceneTreeItem,
  location?: TreeItemInsertFlag
) => {
  const groupscenetreeitem = sceneTree.createGroupTreeItem(
    undefined,
    undefined,
    treeItem,
    location
  );
  if (!groupscenetreeitem) return;
  groupscenetreeitem.name = "新建文件夹";
};

//默认右键菜单，右键树的空白区域
export const getDefauleMenuContent = (
  objm: ESObjectsManager,
  sceneTree: SceneTree,
  showCheckbox: boolean
): MenuItem[] => {
  const baseMenu: MenuItem[] = [
    {
      text: "新建文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(sceneTree);
      },
    },
    {
      text: "新建对象",
      keys: "",
      func: async () => {
        const type = await getCreateSceneObjectType();
        if (!type) return;
        const treeItem = sceneTree.createSceneObjectTreeItem(type);
        if (!treeItem) return;
        sceneTree.uiTree.clearAllSelectedItems();
        treeItem.uiTreeObject.selected = true;
        //TODO:属性树挂载节点
        // objm.propSceneTree = treeItem;
        const { sceneObject } = treeItem;
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
        const treeItem = sceneTree.createSceneObjectTreeItemFromJson(json);
        if (!treeItem) return;
        sceneTree.uiTree.clearAllSelectedItems();
        treeItem.uiTreeObject.selected = true;
        ElMessage.success("创建成功");
      },
    },
    {
      type: "divider",
    },
    {
      text: "刷新场景",
      keys: "",
      func: () => {
        objm.activeViewer?.forceRecreate();
      },
    },
    {
      text: "抬升高度",
      keys: "",
      func: async () => {
        await defaultLiftHeightFunc(sceneTree, showCheckbox);
      },
    },
    {
      type: "divider",
    },
    {
      text: "下载场景 JSON",
      keys: "",
      func: () => {
        downloadJson(
          objm.json,
          "earth_ui_scene" + dayjs().format("_MM_DD") + ".json",
          true
        );
      },
    },
    {
      text: "导出为 GeoJSON",
      keys: "",
      func: async () => {
        try {
          const geoJson = transformToGeoJson(sceneTree, showCheckbox);
          const flag = await downloadJson(
            geoJson,
            "earth_ui_scene" + dayjs().format("_MM_DD") + ".geojson"
          );
          if (flag) {
            ElMessage.success("导出成功");
          } else {
            ElMessage.error("导出失败");
          }
        } catch (error) {
          console.error(error);
          ElMessage.error(`导出失败`);
        }
      },
    },

    {
      text: "缓存当前场景",
      keys: "",
      func: () => {
        const lastJson = window.localStorage.getItem(
          localStorageKey.Earth_UI_STORAGE_SCENE
        );
        const json = objm.json;
        if (lastJson) {
          ElMessageBox.confirm("已存在缓存场景，是否覆盖?")
            .then(() => {
              window.localStorage.setItem(
                localStorageKey.Earth_UI_STORAGE_SCENE,
                JSON.stringify(json)
              );
              ElMessage.success("缓存成功");
            })
            .catch((err) => {});
        } else {
          window.localStorage.setItem(
            localStorageKey.Earth_UI_STORAGE_SCENE,
            JSON.stringify(json)
          );
          ElMessage.success("缓存成功");
        }
      },
    },
  ];

  const storageSceneItem = {
    text: "加载已缓存场景",
    keys: "",
    func: () => {
      ElMessageBox.confirm("确认加载已缓存场景吗？").then(() => {
        const localJsonStr = window.localStorage.getItem(
          localStorageKey.Earth_UI_STORAGE_SCENE
        );
        if (!localJsonStr) return;
        const localJson = JSON.parse(localJsonStr);
        if (
          localJson.lastView &&
          localJson.lastView.position &&
          localJson.lastView.rotation
        ) {
          objm.activeViewer?.flyIn(
            localJson.lastView.position,
            localJson.lastView.rotation
          );
        }
        objm.json = { ...localJson };
        ElMessage.success("缓存场景加载成功");
      });
    },
  };

  const localJson = window.localStorage.getItem(
    localStorageKey.Earth_UI_STORAGE_SCENE
  );
  localJson && baseMenu.push(storageSceneItem);

  return baseMenu;
};

//右键场景树节点
export const getTreeItemMenuContent = (
  objm: ESObjectsManager,
  sceneTree: SceneTree,
  treeItem: SceneTreeItem
): MenuItem[] => {
  return [
    {
      text: "重命名",
      keys: "",
      func: () => {
        treeItem.nameEditing = true;
      },
    },
  ];
};
