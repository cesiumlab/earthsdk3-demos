
import { ESUeViewer } from "earthsdk3-ue";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
import { Message } from "earthsdk-ui"
//通过json创建场景对象
/**
 * 
 * @param sceneTree sceneTree
 * @param json 需要创建的场景对象的完整json
 */
export const createSceneObjTreeItemFromJson = (xbsjEarthUi: XbsjEarthUi, json: any, zIndex?: number) => {
    const sceneTree = xbsjEarthUi.getSceneTree()
    if (!sceneTree) return
    let treeItem: any
    const lastSceneTreeItem = sceneTree.lastSelectedItem
    if (!lastSceneTreeItem) {
        treeItem = sceneTree.createSceneObjectTreeItemFromJson(json)
    } else {
        if (lastSceneTreeItem.type === 'Folder') {
            treeItem = sceneTree.createSceneObjectTreeItemFromJson(json, lastSceneTreeItem, 'Inner')
        } else {
            treeItem = sceneTree.createSceneObjectTreeItemFromJson(json, lastSceneTreeItem, 'After')
        }
    }
    sceneTree.uiTree.clearAllSelectedItems()
    treeItem.uiTreeObject.selected = true
    const { sceneObject } = treeItem
    if (zIndex) {
        sceneObject.zIndex = zIndex 
    }
    xbsjEarthUi.propSceneTree = treeItem
}
//点击事件执行函数（执行pos）
/**
 * 
 * @param xbsjEarthUi 传入当前的XbsjEarthUi类
 * @param pos 传入你获取到位置(经纬高的数组)之后，要执行的函数
 * @returns 返回值是一个的执行函数，外部需要调用一下，结束点击事件
 */
export const executePos = (xbsjEarthUi: XbsjEarthUi, pos: (position: [number, number, number]) => void) => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    let dispose = viewer.clickEvent.don(async (e: any) => {
        const result = await viewer.pickPosition(e.screenPosition)
        if (!result) return
        pos(result)
    })
    let dispose1 = viewer.dblclickEvent.don(async (e: any) => {
        const result = await viewer.pickPosition(e.screenPosition)
        if (!result) return
        pos(result)
    })
    return [dispose, dispose1]
}
//unrealActor ue点击返回信息事件
/**
 * 
 * @param xbsjEarthUi 传入当前的挂载ueViewer的XbsjEarthViewer类
 * @param pos 传入你获取到位置(经纬高的数组)之后，要执行的函数
 * @returns 返回值是一个ue的执行函数，外部需要循环调用一下，结束点击事件
 */
export const ueActorResult = (xbsjEarthUi: XbsjEarthUi, pos: (message: any) => void) => {
    const viewer = xbsjEarthUi.activeViewer
    if (!viewer) return
    let disposeUe = viewer.clickEvent.don(async e => { // ue中没有pointerDown，但是ue的click相当于pointerDown
        if (!e.screenPosition) return;
        if (!(viewer instanceof ESUeViewer)) {
            Message.warning('请在ue视口下操作')
            return
        }
        const result = await viewer.pick(e.screenPosition, false)
        // console.log('result',result);
        if (!result) return
        pos(result)
    });
    return disposeUe
}
