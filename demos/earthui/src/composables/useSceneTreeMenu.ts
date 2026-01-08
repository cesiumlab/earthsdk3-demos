//右键场景树空白区域

import { getLiftHeightValue } from "@/components";
import { downloadJson } from "@/utils";
import dayjs from "dayjs";
import { MenuItem } from "earthsdk-ui";
import {
  ESObjectsManager,
  ESSceneObject,
  SceneTree,
  SceneTreeItem,
  TreeItemInsertFlag,
} from "earthsdk3";
import {
  getCheckedSceneObjectsFromTree,
  getSceneObjectsFromTree,
} from "./useSceneTreeItem";

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

//默认右键菜单
export const getDefauleMenuContent = (
  objm: ESObjectsManager,
  sceneTree: SceneTree,
  showCheckbox: boolean
): MenuItem[] => {
  return [
    {
      text: "添加文件夹",
      keys: "",
      func: () => {
        addNewTreeItem(sceneTree);
      },
    },
    {
      text: "下载场景",
      keys: "",
      func: () => {
        downloadJson(objm.json, "earth_ui_scene" + dayjs().format("_MM_DD"));
      },
    },
    {
      text: "抬升高度(勾选节点)",
      keys: "",
      func: async () => {
        let sceneObjectList: ESSceneObject[] = [];
        if (showCheckbox) {
          sceneObjectList = getCheckedSceneObjectsFromTree(sceneTree);
        } else {
          sceneObjectList = getSceneObjectsFromTree(sceneTree);
        }
        const height = await getLiftHeightValue(2);
        console.log("高度", height);
      },
    },
  ];
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
