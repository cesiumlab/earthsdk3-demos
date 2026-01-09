/**
 * 基础操作菜单:删除、剪切、复制、粘贴
 */
import { SceneTree, SceneTreeItem, Tree } from "earthsdk3";
import { getSceneObjectsForMenu } from "./useSceneTreeItem";
import { ElMessage, ElMessageBox } from "element-plus";
import { MenuItem } from "earthsdk-ui";
import { redrawFunc } from "./useSceneTreeMenu";

let cutTreeItems: SceneTreeItem[] = [];

export const getSceneTreeItemConfigMenu = (
  sceneTree: SceneTree,
  showCheckbox: boolean,
  treeItem: SceneTreeItem
): MenuItem[] => {
  const tags = {
    sceneTree: "全部",
    selected: "选中项",
    treeItem: "该项",
    checked: "已勾选项",
  };
  const { sceneTreeItems, tag } = getSceneObjectsForMenu(
    sceneTree,
    showCheckbox,
    treeItem
  );

  if (tag === "sceneTree") return [];

  const baseMenu: MenuItem[] = [
    {
      text: "重命名",
      keys: "",
      func: () => {
        treeItem.nameEditing = true;
      },
    },
    {
      text: "克隆" + tags[tag],
      keys: "",
      func: () => {
        try {
          sceneTreeItems.forEach((item) => {
            cloneTreeItem(item);
          });
          ElMessage.success("克隆成功");
        } catch (error) {
          console.error(error);
          ElMessage.error("克隆失败");
        }
      },
    },
    {
      text: "剪切" + tags[tag],
      keys: "",
      func: () => {
        try {
          cutTreeItems = [];
          sceneTreeItems.forEach((item) => {
            cutTreeItem(item);
          });
          redrawFunc(sceneTree);
          ElMessage.success("剪切成功");
        } catch (error) {
          console.error(error);
          ElMessage.error("剪切失败");
        }
      },
    },
    {
      text: "删除" + tags[tag],
      keys: "",
      func: () => {
        try {
          ElMessageBox.confirm("确定删除所选节点?").then(() => {
            sceneTreeItems.forEach((item) => {
              if (item.isDestroyed()) return;
              item.detachFromParent();
            });
            ElMessage.success("删除成功");
          });
        } catch (error) {
          console.error(error);
          ElMessage.error("删除失败");
        }
      },
    },
  ];

  if (cutTreeItems.length > 0) {
    // baseMenu.unshift({
    //   text: "清空剪切板",
    //   keys: "",
    //   func: () => {
    //     cutTreeItems = [];
    //     ElMessage.success("清空成功");
    //   },
    // });
    baseMenu.unshift({
      text: "粘贴",
      keys: "",
      func: () => {
        try {
          if (Tree.canMoveToTreeItems(cutTreeItems, treeItem, "inner")) {
            Tree.moveToTreeItems(cutTreeItems, treeItem, "inner");
            cutTreeItems = [];
            ElMessage.success("粘贴成功");
          } else {
            ElMessage.warning("节点异常");
          }
        } catch (error) {
          console.error(error);
          ElMessage.error("粘贴失败");
        }
      },
    });
    // baseMenu.unshift({
    //   text: "粘贴到此处",
    //   keys: "",
    //   func: () => {
    //     try {
    //       if (Tree.canMoveToTreeItems(cutTreeItems, treeItem, "after")) {
    //         Tree.moveToTreeItems(cutTreeItems, treeItem, "after");
    //         ElMessage.success("粘贴成功");
    //         cutTreeItems = [];
    //       } else {
    //         ElMessage.warning("节点异常");
    //       }
    //     } catch (error) {
    //       console.error(error);
    //       ElMessage.error("粘贴失败");
    //     }
    //   },
    // });
  }
  return baseMenu;
};

const cloneTreeItem = (treeItem: SceneTreeItem) => {
  if (!treeItem.parent || !treeItem.parent.children) return;
  const cloneTreeItem = treeItem.clone();
  if (!cloneTreeItem) return;
  treeItem.parent.children.push(cloneTreeItem);
};

const cutTreeItem = (treeItem: SceneTreeItem) => {
  if (!cutTreeItems.includes(treeItem)) {
    cutTreeItems.push(treeItem);
  }
};
