import { getNoToken } from "@/api/service";
import { ESGeoLineString, ESGeoPolygon, ESObjectsManager, ESTextLabel, SceneTreeItem } from "earthsdk3";
import { ElMessage } from "element-plus";


export function geojsonToPointsLinesPolygons(geojson: any) {
    const result = {
        points: [],
        lines: [],
        polygons: []
    }
    if (geojson.type === 'FeatureCollection') {
        geojson.features.forEach(function (feature: { geometry: any; properties: any }) {
            convertGeometry(feature.geometry, result, feature.properties)
        })
    } else {
        convertGeometry(geojson, result)
    }
    return result
}

export function convertGeometry(
    geometry: { type: any; coordinates: any[]; geometries: any[]; geometry: any },
    result: { points: any; lines: any; polygons: any },
    properties?: any
) {
    switch (geometry.type) {
        case 'Point':
            result.points.push({ coordinates: geometry.coordinates, properties })
            break
        case 'MultiPoint':
            geometry.coordinates.forEach(function (point: any[]) {
                result.points.push({ coordinates: point, properties })
            })
            break
        case 'LineString':
            result.lines.push({ coordinates: geometry.coordinates, properties })
            break
        case 'MultiLineString':
            geometry.coordinates.forEach(function (line: any[]) {
                result.lines.push({ coordinates: line, properties })
            })
            break
        case 'Polygon':
            geometry.coordinates.forEach(function (polygon: any[]) {
                result.polygons.push({ polygon, properties })
            })
            break
        case 'MultiPolygon':
            geometry.coordinates.forEach(function (polygon: any[]) {
                result.polygons.push({ polygon: polygon[0], properties })
            })
            break
        case 'GeometryCollection':
            geometry.geometries.forEach(function (geom: any) {
                convertGeometry(geom, result)
            })
            break
        default:
            convertGeometry(geometry.geometry, result)
    }
}

export const JsonToESObjects = (objm: ESObjectsManager, json: any) => {
    const result = geojsonToPointsLinesPolygons(json);
    if (result.points.length > 0 || result.lines.length > 0 || result.polygons.length > 0) {
        const group = objm.sceneTree.createGroupTreeItem('GeoJSON')
        if (result.points.length > 0) {
            const pointsGroup = objm.sceneTree.createGroupTreeItem(
                'points',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            createpoints(objm, result.points, pointsGroup)
        }
        if (result.lines.length > 0) {
            const linesGroup = objm.sceneTree.createGroupTreeItem(
                'lines',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            createLines(objm, result.lines, linesGroup)
        }
        if (result.polygons.length > 0) {
            const polygonsGroup = objm.sceneTree.createGroupTreeItem(
                'polygons',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            createpolygons(objm, result.polygons, polygonsGroup)
        }
    } else {
        ElMessage.warning('请检查 GeoJSON 格式是否正确')
    }
}

export function createLines(objm: ESObjectsManager, lines: any, linesGroup: SceneTreeItem) {
    lines.forEach((element: any, index: number) => {
        // console.log('createLines', element);
        let points: [number, number, number][] = []
        element.coordinates.forEach((item: [number, number] | [number, number, number]) => {
            if (item.length === 2) {
                points.push([...item, 0])
            } else if (item.length === 3) {
                points.push(item)
            }
        })
        const treeItem = objm.sceneTree.createSceneObjectTreeItem(
            'ESGeoLineString',
            undefined,
            linesGroup,
            'Inner'
        ) as SceneTreeItem
        const sceneObject = treeItem.sceneObject as ESGeoLineString
        sceneObject.points = points
        if (element.properties && (element.properties.NAME || element.properties.name)) {
            sceneObject.name = element.properties.NAME ?? element.properties.name
        } else {
            sceneObject.name = `折线${index + 1}`
        }
        sceneObject.strokeStyle = {
            width: 1,
            widthType: 'screen',
            color: [0.7137254901960784, 0.8274509803921568, 0.10196078431372549, 1],
            material: '',
            materialParams: {},
            ground: false
        }
    })
}
export function createpoints(objm: ESObjectsManager, points: any, pointsGroup: SceneTreeItem) {
    points.forEach((element: any, index: number) => {
        // console.log('createpoints', element);
        const position =
            element.coordinates.length === 2
                ? ([...element.coordinates, 0] as [number, number, number])
                : element.coordinates
        const treeItem = objm.sceneTree.createSceneObjectTreeItem(
            'ESTextLabel',
            undefined,
            pointsGroup,
            'Inner'
        ) as SceneTreeItem
        const sceneObject = treeItem.sceneObject as ESTextLabel
        sceneObject.position = position
        if (element.properties && (element.properties.NAME || element.properties.name)) {
            sceneObject.text = element.properties.NAME ?? element.properties.name
            sceneObject.name = element.properties.NAME ?? element.properties.name
        } else {
            sceneObject.text = `点位${index + 1}`
            sceneObject.name = `点位${index + 1}`
        }
    })
}
export function createpolygons(
    objm: ESObjectsManager,
    polygons: any,
    polygonsGroup: SceneTreeItem
) {
    polygons.forEach((element: any, index: number) => {
        let points: [number, number, number][] = []
        element.polygon.forEach((item: [number, number] | [number, number, number]) => {
            if (item.length === 2) {
                points.push([...item, 0])
            } else if (item.length === 3) {
                points.push(item)
            }
        })
        const treeItem = objm.sceneTree.createSceneObjectTreeItem(
            'ESGeoPolygon',
            undefined,
            polygonsGroup,
            'Inner'
        ) as SceneTreeItem
        const sceneObject = treeItem.sceneObject as ESGeoPolygon
        sceneObject.points = points
        if (element.properties && (element.properties.NAME || element.properties.name)) {
            sceneObject.name = element.properties.NAME ?? element.properties.name
        } else {
            sceneObject.name = `多边形${index + 1}`
        }
        sceneObject.stroked = true
        sceneObject.strokeStyle = {
            width: 1,
            widthType: 'screen',
            color: [0.6235294117647059, 0.7294117647058823, 0.08627450980392157, 1],
            material: '',
            materialParams: {},
            ground: false
        }
        sceneObject.filled = true
        sceneObject.fillStyle = {
            color: [0.788235294117647, 0.9098039215686274, 0.058823529411764705, 0.2],
            material: '',
            materialParams: {},
            ground: false
        }
    })
}

export const geojsonToESObiects = async (objm: ESObjectsManager, url: any) => {
    try {
        if (typeof url === "string") {
            const json = await getNoToken(url);
            JsonToESObjects(objm, json);
        } else {
            JsonToESObjects(objm, url);
        }
    } catch (error) {
        console.error(error);
        ElMessage.warning('转换异常！')
    }

}
