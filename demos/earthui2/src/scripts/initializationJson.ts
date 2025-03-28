
import { get, getNoToken } from '../api/service'
import { parse } from 'search-params'
import { ES3DTileset, ESImageryLayer, ESTerrainLayer, ESImageLabel, ESVOptionUe, ESJSwitchToUEViewerOptionType } from "earthsdk3";
import { Message } from "earthsdk-ui"
import { XbsjEarthUi } from './xbsjEarthUi';
import { $config } from './getConfig';
import { ESUeViewer } from 'earthsdk3-ue';
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
        xbsjEarthUi.switchToCesiumViewer('viewersContainer')
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
                    app: appid
                } as ESJSwitchToUEViewerOptionType
                const viewer = xbsjEarthUi.switchToUEViewer(options) as unknown as ESUeViewer
                viewer.statusChanged.don((newValue) => {
                    if (newValue === 'Error') {
                        xbsjEarthUi.switchToCesiumViewer('viewersContainer')
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
//json文件
const initJsin = (url: string) => {
    const json = {
        "asset": {
            "version": "0.1.0",
            "createdTime": "2022-06-17T05:54:41.744Z",
            "modifiedTime": "2023-06-08T10:25:47.763Z",
            "name": "图层管理",
            "type": "ESObjectsManager"
        },
        "viewers": [],
        "sceneTree": {
            "root": {
                "children": [
                    {
                        "name": "新建场景",
                        "children": [
                            {
                                "name": "全球影像",
                                "sceneObj": {
                                    "id": "ae103185-08c7-4ed0-b6d4-15ad77bbbf66",
                                    "type": "ESImageryLayer",
                                    "url": `${url}`,
                                    "rectangle": [
                                        -180,
                                        -90,
                                        180,
                                        90
                                    ],
                                    "allowPicking": true,
                                    "name": "全球影像",
                                    "maximumLevel": 18
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            }
        },
        "viewCollection": []
    }
    return json
}
function initSceneFetch(xbsjEarthUi: XbsjEarthUi) {
    getNoToken(`https://account.bjxbsj.cn/api/bjxbsj/online/default`).then((res: any) => {
        if (res && res.url) {
            const json = initJsin(res.url)
            xbsjEarthUi.json = json
            Message.success('加载默认场景成功')
        } else {
            const json = initJsin('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
            xbsjEarthUi.json = json
            Message.success('加载默认场景成功')
        }
    }).catch((error: any) => {
        const json = initJsin('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
        xbsjEarthUi.json = json
        Message.success('加载默认场景成功')
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



