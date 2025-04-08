
import { Message } from "earthsdk-ui";
import { ES3DTileset, ESImageryLayer, ESJSwitchToUEViewerOptionType, ESTerrainLayer, ESVOptionUe } from "earthsdk3";
import { ESUeViewer } from 'earthsdk3-ue';
import { parse } from 'search-params';
import { get, getNoToken } from '../api/service';
import { $config } from './getConfig';
import { XbsjEarthUi } from './xbsjEarthUi';
import { JsonValue } from "xbsj-base";
const search = window.location.search.substring(1)
const parseSearch = parse(search)
//scene
function initSceneId(xbsjEarthUi: XbsjEarthUi) {
    const id = parseSearch.scene
    let url = `${xbsjEarthUi.cesiumLabUrl}/tile/scene?id=${id}`
    if (xbsjEarthUi.cesiumLabToken) {
        url += `&labtoken=${xbsjEarthUi.cesiumLabToken}`
    }
    const token = localStorage.getItem('token') as string | undefined
    get(url, xbsjEarthUi.cesiumLabToken ? undefined : token).then((res: any) => {
        if (res.code === 1000) {
            const resJson = JSON.parse(res.data.content)
            if (!resJson) return
            xbsjEarthUi.json = resJson
            if (resJson.lastView) {
                setTimeout(() => {
                    xbsjEarthUi.activeViewer?.flyIn(resJson.lastView.position, resJson.lastView.rotation)
                }, 1000)
            }
            Message.success(`加载场景成功：${id}`)
        } else {
            initSceneFetch(xbsjEarthUi)
        }
    }).catch(error => {
        console.log(error);
        initSceneFetch(xbsjEarthUi)
    })
}
//esss
function initESSSsceneId(xbsjEarthUi: XbsjEarthUi) {
    const sceneid = parseSearch.ESSSsceneid as string
    const appid = parseSearch.appid as string
    const token = parseSearch.token as string
    if (!appid) {
        Message.error(`无appid,加载应用失败`)
        xbsjEarthUi.switchToCesiumViewer({
            container: 'viewersContainer',
            destroy: true,
            id: 'earthui-active-viewer-id',
        })
    }
    if (!token) {
        Message.error(`无token值`)
    } else {
        const origin = window.location.origin
        // const origin = 'http://114.242.26.126:30001';
        // const origin = 'http://localhost:9006';
        get(`${origin}/setting/get`).then((res: any) => {
            if (res.status === 'ok') {
                Message.success(`加载场景成功：${appid}`)
                const options = {
                    container: 'viewersContainer',
                    uri: origin,
                    app: appid,
                    destroy: true,
                    id: 'earthui-active-viewer-id',
                } as ESJSwitchToUEViewerOptionType
                const viewer = xbsjEarthUi.switchToUEViewer(options) as unknown as ESUeViewer
                if (viewer.extras) {
                    viewer.extras = {
                        ...viewer.extras as any,
                        uri: origin,
                        app: appid,
                    }
                } else {
                    viewer.extras = {
                        uri: origin,
                        app: appid,
                    }
                }

                viewer.statusChanged.don((newValue) => {
                    if (newValue === 'Error') {
                        xbsjEarthUi.switchToCesiumViewer({
                            container: 'viewersContainer',
                            destroy: true,
                            id: 'earthui-active-viewer-id',
                        })
                    } else if (newValue === 'Created') {
                        viewer.defaultCameraFlyIn(1)
                    }
                });
                if (sceneid) {
                    get(`${origin}/staticscene/get?id=${sceneid}`, token).then((res: any) => {
                        if (res.status === 'ok') {
                            const resJson = res.data.content
                            if (!resJson) {
                                initSceneFetch(xbsjEarthUi)
                            } else {
                                xbsjEarthUi.json = resJson
                            }
                        } else {
                            initSceneFetch(xbsjEarthUi)
                        }
                    }).catch(error => {
                        initSceneFetch(xbsjEarthUi)
                    })
                } else {
                    initSceneFetch(xbsjEarthUi)
                }

            }
        }).catch(err => {
            get(`${origin}/staticscene/${sceneid}`, token).then((res: any) => {
                if (res.status === 'ok') {
                    Message.success(`加载场景成功：${appid}`)
                    const options = {
                        type: 'ESUeViewer',
                        container: 'viewersContainer',
                        id: 'earthui-active-viewer-id',
                        options: {
                            uri: origin,
                            app: appid
                        }
                    } as ESVOptionUe
                    const viewer = xbsjEarthUi.createUeViewer(options)
                    const resJson = res.data.content
                    if (!resJson) {
                        initSceneFetch(xbsjEarthUi)
                    } else {
                        xbsjEarthUi.json = resJson
                    }
                } else {
                    initSceneFetch(xbsjEarthUi)
                }
            }).catch(error => {
                console.log(error);
                initSceneFetch(xbsjEarthUi)
            })

        })
    }
}
//默认场景
function initSceneFetch(xbsjEarthUi: XbsjEarthUi) {
    try {
        fetch('./scene.json').then((res) => {
            if (res.ok) {
                res.json().then((json) => {
                    xbsjEarthUi.json = json
                    Message.success('加载默认场景成功')
                }).catch((error) => {
                    console.log(error);
                    Message.success('加载默认场景失败')
                })
            } else {
                Message.success('加载默认场景失败')
            }
        })
    } catch (error) {
        console.log(error);

    }


    getNoToken(`https://account.bjxbsj.cn/api/bjxbsj/online/default`).then((res: any) => {
        if (res && res.url) {
            xbsjEarthUi.sceneTree.createSceneObjectTreeItemFromJson({
                "type": "ESImageryLayer",
                "url": res.url,
                "name": "全球影像",
            })
        }
    }).catch((error: any) => {
        console.log(error);
    })
}


//初始化
export function initSceneJson(xbsjEarthUi: XbsjEarthUi) {
    if (search) {
        if (parseSearch.scene) {//存在scene
            initSceneId(xbsjEarthUi)
        } else if (parseSearch.appid) {//存在scene
            initESSSsceneId(xbsjEarthUi)
        } else {
            initSceneFetch(xbsjEarthUi)
        }
    } else {
        initSceneFetch(xbsjEarthUi)
    }
}
function a(v: any) {
    if (v === undefined || v === null) return undefined
    return +v
}
export function initSceneWithType(xbsjEarthUi: XbsjEarthUi) {
    const sceneTree = xbsjEarthUi.getSceneTree()
    if (!sceneTree) return
    if (parseSearch.type) {
        if (parseSearch.type === 'images') {//存在images
            const rectangle = [+(parseSearch.west ?? -180), +(parseSearch.south ?? -90), +(parseSearch.east ?? 180), +(parseSearch.north ?? 90)]
            // console.log('images', parseSearch);
            const czmTilingScheme = parseSearch.proj === "4326" ? "GeographicTilingScheme" : "WebMercatorTilingScheme"
            const url = parseSearch.tiletrans === "tms" ? `${parseSearch.url}/tilemapresource.xml` : `${parseSearch.url}`
            const imagesJson =
            {
                "type": "ESImageryLayer",
                "url": url + `${xbsjEarthUi.cesiumLabToken ? '?labtoken=' + xbsjEarthUi.cesiumLabToken : ''}`,
                "rectangle": rectangle,
                // "czmTilingScheme": czmTilingScheme,
                "allowPicking": true,
                "name": `${parseSearch.name}`,
                "minimumLevel": a(parseSearch.minzoom),
                "maximumLevel": a(parseSearch.maxzoom),
                // "czmTileWidth": a(parseSearch.tilesize),
                // "czmTileHeight": a(parseSearch.tilesize),
                "zIndex": 1,
                "options": {
                    type: parseSearch.tiletrans === "tms" ? 'tms' : 'xyz',
                    tilingScheme: { type: czmTilingScheme }
                }
            }
            const treeItem = sceneTree.createSceneObjectTreeItemFromJson<ESImageryLayer>(imagesJson);
            if (!treeItem) return
            sceneTree.uiTree.clearAllSelectedItems()
            treeItem.uiTreeObject.selected = true
            const { sceneObject } = treeItem
            if (!(sceneObject instanceof ESImageryLayer)) return
            setTimeout(() => {
                sceneObject.flyTo()
            }, 1000);
        } else if (parseSearch.type === "terrains") {//存在terrains
            const rectangle = [+(parseSearch.west ?? -180), +(parseSearch.south ?? -90), +(parseSearch.east ?? 180), +(parseSearch.north ?? 90)]
            const terrainsJson = {
                "type": "ESTerrainLayer",
                "url": `${parseSearch.url}` + `${xbsjEarthUi.cesiumLabToken ? '?labtoken=' + xbsjEarthUi.cesiumLabToken : ''}`,
                "rectangle": rectangle,
                "allowPicking": true,
                "name": `${parseSearch.name}`,
            }
            const treeItem = sceneTree.createSceneObjectTreeItemFromJson<ESTerrainLayer>(terrainsJson);
            if (!treeItem) return
            sceneTree.uiTree.clearAllSelectedItems()
            treeItem.uiTreeObject.selected = true
            const { sceneObject } = treeItem
            if (!(sceneObject instanceof ESTerrainLayer)) return
            setTimeout(() => {
                sceneObject.flyTo()
            }, 1000);
        } else if (parseSearch.type === "models") {//存在models
            const tilesetJson = {
                "type": "ES3DTileset",
                "url": `${parseSearch.url}` + `${xbsjEarthUi.cesiumLabToken ? '?labtoken=' + xbsjEarthUi.cesiumLabToken : ''}`,
                "allowPicking": true,
                "name": `${parseSearch.name}`,
            }
            const treeItem = sceneTree.createSceneObjectTreeItemFromJson<ES3DTileset>(tilesetJson);
            if (!treeItem) return
            sceneTree.uiTree.clearAllSelectedItems()
            treeItem.uiTreeObject.selected = true
            const { sceneObject } = treeItem
            if (!(sceneObject instanceof ES3DTileset)) return
            setTimeout(() => {
                sceneObject.flyTo()
            }, 1000);
        }
    }
}

//初始化地址
export function initurl(xbsjEarthUi: XbsjEarthUi) {
    if (parseSearch.czmlabPath) {
        xbsjEarthUi.czmlabPath = parseSearch.czmlabPath as string
        console.log('czmlab-path:', xbsjEarthUi.czmlabPath);
    }
    if (parseSearch.cesiumLabUrl) {
        xbsjEarthUi.cesiumLabUrl = parseSearch.cesiumLabUrl as string
        // console.log('cesiumLabUrl:', xbsjEarthUi.cesiumLabUrl);
    }
    if (parseSearch[$config.jumpToken]) {
        xbsjEarthUi.cesiumLabToken = parseSearch[$config.jumpToken] as string
        // console.log('cesiumLabToken:', xbsjEarthUi.cesiumLabToken);
    }
    if (parseSearch.cesiumLabToken) {
        xbsjEarthUi.cesiumLabToken = parseSearch.cesiumLabToken as string
        // console.log('cesiumLabToken:', xbsjEarthUi.cesiumLabToken);
    }

}



