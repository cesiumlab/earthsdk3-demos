import { ESSceneObject, SceneTree, SceneTreeItem } from "earthsdk3";

// ______________________________________________________________________
//寻找节点上所有被选择的对象
export function getCheckedSceneObjectsFromTreeItem(
  innerobjItem: SceneTreeItem,
  result: ESSceneObject[]
) {
  if (innerobjItem.sceneObject) {
    const checked = innerobjItem.uiTreeObject.checkedStatus;
    if (checked === "checked") {
      result.push(innerobjItem.sceneObject);
    }
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      getCheckedSceneObjectsFromTreeItem(
        innerobjItem.children._innerObj[i] as SceneTreeItem,
        result
      );
    }
  }
}

//寻找场景树上所有被选择的对象
export function getCheckedSceneObjectsFromTree(sceneTree: SceneTree) {
  const result: ESSceneObject[] = [];
  if (sceneTree && sceneTree.children._innerObj) {
    const innerobj = sceneTree.children._innerObj;
    for (let index = 0; index < innerobj.length; index++) {
      getCheckedSceneObjectsFromTreeItem(innerobj[index], result);
    }
  }
  return result;
}
// ______________________________________________________________________
//寻找节点上的所有对象
export function getSceneObjectsFromTreeItem(
  innerobjItem: SceneTreeItem,
  result: ESSceneObject[]
) {
  if (innerobjItem.sceneObject) {
    result.push(innerobjItem.sceneObject);
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      getSceneObjectsFromTreeItem(
        innerobjItem.children._innerObj[i] as SceneTreeItem,
        result
      );
    }
  }
}
//寻找场景树上的所有的对象
export function getSceneObjectsFromTree(sceneTree: SceneTree) {
  const result: ESSceneObject[] = [];
  if (sceneTree && sceneTree.children._innerObj) {
    const innerobj = sceneTree.children._innerObj;
    for (let index = 0; index < innerobj.length; index++) {
      getSceneObjectsFromTreeItem(innerobj[index], result);
    }
  }
  return result;
}
// ______________________________________________________________________
