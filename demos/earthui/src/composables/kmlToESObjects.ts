/**
 * Kml转ES对象
 * @param url
 */

import { getNoTokenText } from "@/api/service"
import { ESGeoLineString, ESGeoPolygon, ESObjectsManager, ESTextLabel, SceneTreeItem } from "earthsdk3"
import { ElMessage } from "element-plus"

// 定义数据结构类型
interface KmlPoint {
    name: string
    coordinates: [number, number, number]
}

interface KmlLine {
    name: string
    coordinates: [number, number, number][]
}

interface KmlPolygon {
    name: string
    coordinates: [number, number, number][]
}

export const kmlToESObjects = async (objm: ESObjectsManager, input: any) => {
    if (typeof input !== 'string') return;
    try {
        let kmlText: string
        // 判断输入是URL还是KML文本内容
        const isUrl =
            input.startsWith('http://') ||
            input.startsWith('https://') ||
            input.startsWith('ftp://') ||
            input.startsWith('file://')

        if (isUrl) {
            // 如果是URL，则请求获取KML内容
            const res: any = await getNoTokenText(input)
            kmlText = res
        } else {
            // 如果是KML文本内容，直接使用
            kmlText = input
        }

        const parser = new DOMParser()
        const kmlDocument = parser.parseFromString(kmlText, 'text/xml')

        // 检查解析是否成功
        if (kmlDocument.querySelector('parsererror')) {
            ElMessage.warning('解析KML失败,请检查数据源')
            return
        }

        // 工具函数：解析坐标字符串为数组
        const parseCoordinates = (coordText: string): [number, number, number][] => {
            return coordText
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .map((coord: string) => {
                    const arr = coord.split(',').map(Number)
                    if (arr.length === 2) return [arr[0], arr[1], 0]
                    if (arr.length === 3) return [arr[0], arr[1], arr[2]]
                    return [0, 0, 0]
                })
        }

        // 工具函数：获取Placemark的名称
        const getName = (placemark: Element): string => {
            const nameElement = placemark.querySelector('name')
            return nameElement?.textContent?.trim() || '未命名'
        }

        // 提取所有Placemark
        const placemarks = Array.from(kmlDocument.querySelectorAll('Placemark'))

        const points: KmlPoint[] = []
        const lines: KmlLine[] = []
        const polygons: KmlPolygon[] = []

        placemarks.forEach((placemark: Element) => {
            const name = getName(placemark)
            // 点
            const point = placemark.querySelector('Point > coordinates')
            if (point && point.textContent) {
                const coords = parseCoordinates(point.textContent)
                if (coords.length) {
                    points.push({
                        name,
                        coordinates: coords[0]
                    })
                }
            }

            // 线
            const line = placemark.querySelector('LineString > coordinates')
            if (line && line.textContent) {
                const coords = parseCoordinates(line.textContent)
                if (coords.length) {
                    lines.push({
                        name,
                        coordinates: coords
                    })
                }
            }

            // 多边形
            const polygon = placemark.querySelector(
                'Polygon > outerBoundaryIs > LinearRing > coordinates'
            )
            if (polygon && polygon.textContent) {
                const coords = parseCoordinates(polygon.textContent)
                if (coords.length) {
                    polygons.push({
                        name,
                        coordinates: coords
                    })
                }
            }
        })

        const group = objm.sceneTree.createGroupTreeItem('Kml')

        // 创建点位
        if (points.length > 0) {
            const pointsGroup = objm.sceneTree.createGroupTreeItem(
                'points',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            points.forEach((point) => {
                const treeItem = objm.sceneTree.createSceneObjectTreeItem(
                    'ESTextLabel',
                    undefined,
                    pointsGroup,
                    'Inner'
                ) as SceneTreeItem
                const sceneObject = treeItem.sceneObject as ESTextLabel
                sceneObject.position = point.coordinates
                sceneObject.text = point.name
                sceneObject.name = point.name
            })
        }

        // 创建线
        if (lines.length > 0) {
            const linesGroup = objm.sceneTree.createGroupTreeItem(
                'lines',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            lines.forEach((line) => {
                const treeItem = objm.sceneTree.createSceneObjectTreeItem(
                    'ESGeoLineString',
                    undefined,
                    linesGroup,
                    'Inner'
                ) as SceneTreeItem
                const sceneObject = treeItem.sceneObject as ESGeoLineString
                sceneObject.points = line.coordinates
                sceneObject.name = line.name
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

        // 创建多边形
        if (polygons.length > 0) {
            const polygonsGroup = objm.sceneTree.createGroupTreeItem(
                'polygons',
                undefined,
                group,
                'Inner'
            ) as SceneTreeItem
            polygons.forEach((polygon) => {
                const treeItem = objm.sceneTree.createSceneObjectTreeItem(
                    'ESGeoPolygon',
                    undefined,
                    polygonsGroup,
                    'Inner'
                ) as SceneTreeItem
                const sceneObject = treeItem.sceneObject as ESGeoPolygon
                sceneObject.points = polygon.coordinates
                sceneObject.name = polygon.name
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

        // 返回解析结果
        return { points, lines, polygons }
    } catch (error) {
        console.log(error)
        ElMessage.error(`请求失败，请检查数据源！${error}`)
    }
}
