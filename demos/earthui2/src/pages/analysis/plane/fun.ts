
import { ESGeoLineString, ESGeoPolygon, ESSceneObject } from "earthsdk3";
import { XbsjEarthUi } from "../../../scripts/xbsjEarthUi";

//获取所有多边形对象 
function searchAndCollectPolygonValues(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, resultArray: any[]) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESGeoPolygon) {
            resultArray.push({
                name: obj['sceneObj'].name,
                id: obj['sceneObj'].id,
                position: obj['sceneObj'].points
            });
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchAndCollectPolygonValues(xbsjEarthUi, obj['children'][i], resultArray);
        }
    }
}
export function searchForPolygonValues(xbsjEarthUi: XbsjEarthUi) {
    let result: any[] = [];
    const sceneTree=xbsjEarthUi.getSceneTree()
        if(!sceneTree) return
    if (sceneTree.json.root.children) {
        searchAndCollectPolygonValues(xbsjEarthUi, sceneTree.json.root, result);
    }
    return result
}

//获取所有折线
function searchAndCollectLineValues(xbsjEarthUi: XbsjEarthUi, obj: { [key: string]: any }, resultArray: any[]) {
    if (obj['sceneObj']) {
        const sceneObject = xbsjEarthUi.getSceneObjectById(obj['sceneObj'].id)
        if (sceneObject instanceof ESGeoLineString) {
            resultArray.push({
                name: obj['sceneObj'].name,
                id: obj['sceneObj'].id,
                position: obj['sceneObj'].points
            });
        }
    }
    if (obj['children']) {
        for (let i = 0; i < obj['children'].length; i++) {
            searchAndCollectLineValues(xbsjEarthUi, obj['children'][i], resultArray);
        }
    }
}
export function searchForLineValues(xbsjEarthUi: XbsjEarthUi) {
    let result: any[] = [];
    const sceneTree=xbsjEarthUi.getSceneTree()
        if(!sceneTree) return
    if (sceneTree.json.root.children) {
        searchAndCollectLineValues(xbsjEarthUi, sceneTree.json.root, result);
    }
    return result
}

