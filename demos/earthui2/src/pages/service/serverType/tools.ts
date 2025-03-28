import { XbsjEarthUi } from '../../../scripts/xbsjEarthUi';
import { searchMaxZindex } from '../../../scripts/general';
import { getsceneObjNumfromSceneTree } from "../../../scripts/general"
import { ES3DTileset, ESImageryLayer, ESTerrainLayer } from 'earthsdk3';

//影像type
export type imageType = {
    "id": string,
    "name": string,
    "description": null,
    "storageType": string,
    "storageUri": string,
    "west": number,
    "east": number,
    "south": number,
    "north": number,
    "minzoom": number,
    "maxzoom": number,
    "contentType": string,
    "thumbnail": string,
    "proj": number,
    "tiletrans": string,
    "tilesize": number,
    "url": null,
    "userId": null,
    "version": null,
    "subDomain": null,
    "createTime": string,
    "updateTime": null,
    "cors": null
}
//地形type
export type terrainType = {

    "id": string,
    "name": string,
    "description": null,
    "storageType": string,
    "storageUri": string,
    "west": number,
    "east": number,
    "south": number,
    "north": number,
    "minzoom": number,
    "maxzoom": number,
    "contentType": string,
    "thumbnail": null,
    "url": null,
    "userId": null,
    "version": null,
    "subDomain": null,
    "createTime": string,
    "updateTime": null,
    "cors": null,
    "layerJson": null,
    "childResults": null,
    "bounds": {
        "east": number,
        "south": number,
        "north": number,
        "west": number
    },
    "level": {
        "maxlevel": number,
        "minlevel": number
    }
}
//模型type
export type modelType = {
    "id": string,
    "name": string,
    "description": null,
    "storageType": string,
    "storageUri": string,
    "thumbnail": null,
    "userId": null,
    "version": string,
    "subDomain": null,
    "createTime": string,
    "updateTime": null,
    "cors": null,
    "tilesetJson": null,
    "zip": null
}
export type imageServe = {
    type: '影像' | '模型' | '地形',
    name: string,
    serverUrl: string,
    createTime: string,
    MaximumLevel: number,
    czmTilingScheme?: string,
    rectangle?: [number, number, number, number],
    czmMinimumLevel?: number,
    czmMaximumLevel?: number,
    czmTileWidth?: number,
    czmTileHeight?: number,
    proj?: number
}
export type cesiumIonServe = {
    name: "Cesium World Terrain"
    percentComplete: 100
    progressMessage: null
    status: "COMPLETE"
    type: "TERRAIN"
    userId: 204705
}
function containsSubstring(str: string, substring: string) {
    return str.includes(substring);
}
export function createImage(item: imageServe, xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const type = containsSubstring(item.serverUrl, 'wmts') ? 'xyz' : 'tms'
    const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')
    sceneObject.name = item.name + objNum
    let url: any
    if (xbsjEarthUi.cesiumLabToken) {
        url = {
            url: item.serverUrl,
            headers: {
                labtoken: xbsjEarthUi.cesiumLabToken
            }
        }
    } else {
        url = item.serverUrl
    }
    sceneObject.url = url
    if (item.rectangle) sceneObject.rectangle = item.rectangle
    if (item.czmMinimumLevel) sceneObject.minimumLevel = item.czmMinimumLevel
    if (item.czmMaximumLevel) sceneObject.maximumLevel = item.czmMaximumLevel

    const options = {
        type: type,
        tilingScheme: { type: item.czmTilingScheme },
        tileWidth: item.czmTileWidth,
        tileHeight: item.czmTileHeight
    }
    //@ts-ignore
    sceneObject.options = options
    sceneObject.zIndex = maxZindex + 1
    setTimeout(() => {
        sceneObject.flyTo()
    }, 500)
}
export function createModel(item: imageServe, xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.sceneTree
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as ES3DTileset
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ES3DTileset')
    sceneObject.name = item.name + objNum
    let url: any
    if (xbsjEarthUi.cesiumLabToken) {
        url = {
            url: item.serverUrl,
            headers: {
                labtoken: xbsjEarthUi.cesiumLabToken
            }
        }
    } else {
        url = item.serverUrl
    }
    sceneObject.url = url
    sceneObject.tilesetReady.donce((tileset) => {
        sceneObject.flyTo(1)
    })
}
export function createTerrain(item: imageServe, xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESTerrainLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as ESTerrainLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTerrainLayer')
    sceneObject.name = item.name + objNum
    let url: any
    if (xbsjEarthUi.cesiumLabToken) {
        url = {
            url: item.serverUrl,
            headers: {
                labtoken: xbsjEarthUi.cesiumLabToken
            }
        }
    } else {
        url = item.serverUrl
    }
    sceneObject.url = url
    if (item.rectangle) sceneObject.rectangle = item.rectangle
    sceneObject.zIndex = maxZindex + 1
    setTimeout(() => {
        sceneObject.flyTo()
    }, 500);
}


export function createCesiumIonImage(xbsjEarthUi: XbsjEarthUi, info: { name: string, url: string }) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')
    sceneObject.name = info.name + objNum
    sceneObject.url = info.url
    sceneObject.zIndex = maxZindex + 1
    sceneObject.flyTo()
}
export function createCesiumIonTerrain(xbsjEarthUi: XbsjEarthUi, info: { name: string, url: string }) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESTerrainLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESTerrainLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as ESTerrainLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESTerrainLayer')
    sceneObject.name = info.name + objNum
    sceneObject.url = info.url
    sceneObject.zIndex = maxZindex + 1
    sceneObject.flyTo()
}
export function createCesiumIonModel(xbsjEarthUi: XbsjEarthUi, info: { name: string, url: string }) {
    const sceneTree = xbsjEarthUi.sceneTree
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ES3DTileset', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as ES3DTileset
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ES3DTileset')
    sceneObject.name = info.name + objNum
    sceneObject.url = info.url
    sceneObject.tilesetReady.donce((tileset) => {
        sceneObject.flyTo(1)
    })
}
export function createTiandiImage(item: { name: string, serverUrl: string }, xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const type = containsSubstring(item.serverUrl, 'wmts') ? 'xyz' : 'tms'
    const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')
    sceneObject.name = item.name + objNum
    sceneObject.url = item.serverUrl

    const options = {
        type: type,
    }
    //@ts-ignore
    sceneObject.options = options
    sceneObject.zIndex = maxZindex + 1
    sceneObject.flyTo()
}
export function createGeoServerImage(item: any, xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.sceneTree
    let maxZindex = searchMaxZindex(sceneTree, 'ESImageryLayer');
    const currentTreeItem = sceneTree.lastSelectedItem
    let newTreeItem
    if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer')
    } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'Inner')
    } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESImageryLayer', undefined, currentTreeItem, 'After')
    }
    if (!newTreeItem) return
    sceneTree.uiTree.clearAllSelectedItems()
    newTreeItem.uiTreeObject.selected = true
    const sceneObject = newTreeItem.sceneObject as unknown as ESImageryLayer
    xbsjEarthUi.propSceneTree = newTreeItem
    const objNum = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESImageryLayer')
    sceneObject.name = item.name + objNum
    sceneObject.url = item.url
    sceneObject.options = item.options
    sceneObject.rectangle = item.rectangle
    sceneObject.zIndex = maxZindex + 1
    sceneObject.flyTo()
}