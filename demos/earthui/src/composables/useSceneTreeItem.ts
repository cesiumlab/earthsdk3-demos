import { ESSceneObject, SceneTree, SceneTreeItem } from 'earthsdk3'

// ______________________________________________________________________

/**
 * 获取用户真正选择的对象，优先级是selected，最后是sceneTree
 **/
export function getSceneObjectsForMenu(sceneTree: SceneTree): {
  sceneObjects: ESSceneObject[],
  sceneTreeItems: SceneTreeItem[],
  parentSceneTreeItems: SceneTreeItem[],
  tag: 'selected' | 'sceneTree'
} {
  try {
    let sceneObjects: ESSceneObject[] = []
    let sceneTreeItems: SceneTreeItem[] = []
    let parentSceneTreeItems: SceneTreeItem[] = []
    let tag: 'selected' | 'sceneTree' = 'sceneTree'
    if (sceneTree.selectedItems.length > 0) {
      tag = 'selected'
      const {
        sceneObjects: selectedSceneObjects,
        sceneTreeItems: selectedSceneTreeItems,
        parentSceneTreeItems: selectedParentSceneTreeItems
      } = getAllSelectedSceneObjects(sceneTree)
      sceneObjects = selectedSceneObjects;
      sceneTreeItems = selectedSceneTreeItems;
      parentSceneTreeItems = selectedParentSceneTreeItems
    } else {
      tag = 'sceneTree'
      const { sceneObjects: sceneTreeSceneObjects, sceneTreeItems: sceneTreeSceneTreeItems } =
        getAllSceneObjects(sceneTree)
      sceneObjects = sceneTreeSceneObjects
      sceneTreeItems = sceneTreeSceneTreeItems
      parentSceneTreeItems = [sceneTree.root as SceneTreeItem]
    }
    return { sceneObjects, sceneTreeItems, parentSceneTreeItems, tag }
  } catch (error) {
    console.error(error)
    return { sceneObjects: [], sceneTreeItems: [], parentSceneTreeItems: [], tag: 'sceneTree' }
  }
}


/**
 * 递归获取子节点的对象
 */
export const getAllDescendantsSceneObjectsFromSceneTreeItem = (sceneTreeItem: SceneTreeItem) => {
  const descendantsItems = [...sceneTreeItem.getDescendants()] as SceneTreeItem[]
  return {
    sceneObjects: [...descendantsItems.map((item) => item.sceneObject!), sceneTreeItem.sceneObject!],
    sceneTreeItems: [...descendantsItems, sceneTreeItem]
  }
}


/**
 * 获取选择的所有对象
 * @param sceneTree
 * @returns
 */
export const getAllSelectedSceneObjects = (sceneTree: SceneTree) => {
  // 获取所有选中的项
  const items = [...sceneTree.uiTree.getAllSelectedItems()];

  // 获取每个选中项及其所有后代节点的数据
  const list = items.map((item) => getAllDescendantsSceneObjectsFromSceneTreeItem(item));

  // 使用 flatMap 合并并去重场景对象
  const uniqueSceneObjects = [...new Set(list.flatMap((item) => item.sceneObjects))];

  // 使用 flatMap 合并并去重场景树节点
  const uniqueSceneTreeItems = [...new Set(list.flatMap((item) => item.sceneTreeItems))];

  // 如果节点的父节点存在于 uniqueSceneTreeItems 中，则选择父节点；否则选择节点自己
  const uniqueParentSceneTreeItems = [
    ...new Set(
      uniqueSceneTreeItems.map((item) => {
        const parent = item.parent as SceneTreeItem | undefined;
        return parent && uniqueSceneTreeItems.includes(parent) ? parent : item;
      })
    )
  ];

  return {
    sceneObjects: uniqueSceneObjects,
    sceneTreeItems: uniqueSceneTreeItems,
    parentSceneTreeItems: uniqueParentSceneTreeItems
  }
}

/**
 * 获取树上所有场景对象
 * @param sceneTree
 * @returns
 */
export const getAllSceneObjects = (sceneTree: SceneTree) => {
  const descendantsItems = [...sceneTree.getDescendants()] as SceneTreeItem[]
  return {
    sceneObjects: descendantsItems.map((item) => item.sceneObject!),
    sceneTreeItems: descendantsItems
  }
}

/**
 * 获取节点上所有场景对象
 * @param sceneTreeItem
 * @returns
 */
export const getAllSceneObjectsInTreeItem = (sceneTreeItem: SceneTreeItem) => {
  const descendantsItems = [...sceneTreeItem.getDescendants()] as SceneTreeItem[]
  return {
    sceneObjects: descendantsItems.map((item) => item.sceneObject!),
    sceneTreeItems: [sceneTreeItem]
  }
}
