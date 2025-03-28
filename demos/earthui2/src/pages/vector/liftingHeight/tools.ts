import { ESGeoLineString, ESGeoVector, ESObjectWithLocation, ESSceneObject } from "earthsdk3";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";
//获取组节点下的所有的点线面的个数
function searchGroup(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, result: any) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESObjectWithLocation) {
            result.point += 1
        } else if (sceneObject instanceof ESGeoLineString) {
            result.line += 1
        } else if (sceneObject instanceof ESGeoVector) {
            result.polygon += 1
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchGroup(xbsjEarthUi, obj['children'][i], result);
        }
    }
}
export function searchGroupPLP(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }) {
    let result = {
        point: 0,
        line: 0,
        polygon: 0
    };
    if (obj) {
        searchGroup(xbsjEarthUi, obj, result);
    }
    return result
}
//抬升所有点的高度
function searchPoint(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESObjectWithLocation) {
            let position = sceneObject.position
            if (!xbsjEarthUi.activeViewer) return
            xbsjEarthUi.activeViewer.getHeightByLonLat(position[0], position[1], 'Visibility').then((res) => {
                if (res) {
                    position[2] = Number(res) + Number(height)
                    sceneObject.position = [...position]
                }
            })
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchPoint(xbsjEarthUi, obj['children'][i], height);
        }
    }
}
export function pointHeight(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj) {
        searchPoint(xbsjEarthUi, obj, height);
    }
}
//抬升所有线的高度
async function searchline(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESGeoLineString) {
            let points = sceneObject.points
            let pos: [number, number, number][] = []
            if (points && points.length > 0) {
                for (let index = 0; index < points.length; index++) {
                    if (!xbsjEarthUi.activeViewer) return
                    const res = await xbsjEarthUi.activeViewer.getHeightByLonLat(points[index][0], points[index][1], 'Visibility')
                    const h = [points[index][0], points[index][1], Number(res) + Number(height)] as [number, number, number]
                    pos.push(h)
                }
            }
            sceneObject.points = [...pos]
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchline(xbsjEarthUi, obj['children'][i], height);
        }
    }
}
export function lineHeight(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj) {
        searchline(xbsjEarthUi, obj, height);
    }
}
//抬升所有面的高度
async function searchPolygon(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESGeoVector) {
            if (sceneObject instanceof ESGeoLineString) return
            let points = sceneObject.points
            let pos: [number, number, number][] = []
            if (points && points.length > 0) {
                for (let index = 0; index < points.length; index++) {
                    if (!xbsjEarthUi.activeViewer) return
                    const res = await xbsjEarthUi.activeViewer.getHeightByLonLat(points[index][0], points[index][1], 'Visibility')
                    const h = [points[index][0], points[index][1], Number(res) + Number(height)] as [number, number, number]
                    pos.push(h)
                }
            }
            sceneObject.points = [...pos]
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchPolygon(xbsjEarthUi, obj['children'][i], height);
        }
    }
}

//获取组节点下的所有的点线面的个数
export function polygonHeight(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, height: number) {
    if (obj) {
        searchPolygon(xbsjEarthUi, obj, height);
    }
}