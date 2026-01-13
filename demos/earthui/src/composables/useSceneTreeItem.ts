import { ESSceneObject, SceneTree, SceneTreeItem } from 'earthsdk3'

// ______________________________________________________________________

/**
 * 获取用户真正选择的对象，checked优先级最高，其次是selected，然后是treeItem，最后是sceneTree
 **/
export function getSceneObjectsForMenu(
  sceneTree: SceneTree,
  showCheckbox: boolean,
  treeItem?: SceneTreeItem
): {
  sceneObjects: ESSceneObject[]
  sceneTreeItems: SceneTreeItem[]
  tag: 'checked' | 'selected' | 'treeItem' | 'sceneTree'
} {
  try {
    let sceneObjects: ESSceneObject[] = []
    let sceneTreeItems: SceneTreeItem[] = []
    let tag: 'checked' | 'selected' | 'treeItem' | 'sceneTree' = 'sceneTree'
    if (showCheckbox) {
      tag = 'checked'
      const { sceneObjects: checkedSceneObjects, sceneTreeItems: checkedSceneTreeItems } =
        getAllCheckedSceneObjects(sceneTree)
      sceneObjects = checkedSceneObjects
      sceneTreeItems = checkedSceneTreeItems
    } else if (sceneTree.lastSelectedItem) {
      tag = 'selected'
      const { sceneObjects: selectedSceneObjects, sceneTreeItems: selectedSceneTreeItems } =
        getAllSelectedSceneObjects(sceneTree)
      sceneObjects = selectedSceneObjects
      sceneTreeItems = selectedSceneTreeItems
    } else if (treeItem) {
      tag = 'treeItem'
      const { sceneObjects: treeItemSceneObjects, sceneTreeItems: treeItemSceneTreeItems } =
        getAllSceneObjectsInTreeItem(treeItem)
      sceneObjects = treeItemSceneObjects
      sceneTreeItems = treeItemSceneTreeItems
    } else {
      tag = 'sceneTree'
      const { sceneObjects: sceneTreeSceneObjects, sceneTreeItems: sceneTreeSceneTreeItems } =
        getAllSceneObjects(sceneTree)
      sceneObjects = sceneTreeSceneObjects
      sceneTreeItems = sceneTreeSceneTreeItems
    }
    return { sceneObjects, sceneTreeItems, tag }
  } catch (error) {
    console.error(error)
    return { sceneObjects: [], sceneTreeItems: [], tag: 'sceneTree' }
  }
}

/**
 * 获取勾选的所有对象和节点
 * @param sceneTree
 * @returns
 */
export const getAllCheckedSceneObjects = (sceneTree: SceneTree) => {
  const sceneTreeItems = [
    ...sceneTree.uiTree.getAllItems((item) => item.uiTreeObject.checkedStatus === 'checked')
  ]
  const sceneObjects = sceneTreeItems.map((item) => item.sceneObject!)
  return { sceneObjects, sceneTreeItems }
}

/**
 * 获取选择的所有对象
 * @param sceneTree
 * @returns
 */
export const getAllSelectedSceneObjects = (sceneTree: SceneTree) => {
  const sceneTreeItems = [...sceneTree.uiTree.getAllSelectedItems()]
  return {
    sceneObjects: sceneTreeItems.map((item) => item.sceneObject!),
    sceneTreeItems
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
