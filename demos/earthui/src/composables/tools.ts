import { getsceneObjNumfromSceneTree } from '@/scripts/general'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { messageBox } from 'earthsdk-ui'
import { ESGeoJson, ESGeoLineString, ESGeoPolygon, ESGeoVector, ESJSwitchToUEViewerOptionType, ESObjectWithLocation, ESPath, ESTextLabel, JsonValue, SceneTreeItem } from 'earthsdk3'
import { ElMessage } from 'element-plus'
import * as topojson from 'topojson-client'

function createSceneObjByJson(obj: { [key: string]: any }, xbsjEarthUi: XbsjEarthUi) {
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  if (obj['sceneObj']) {
    const a = obj['sceneObj']
    const treeItem = sceneTree.createSceneObjectTreeItemFromJson(a)
    if (treeItem) {
      sceneTree.uiTree.clearAllSelectedItems()
      treeItem.uiTreeObject.selected = true
    }
  }
  if (obj['children']) {
    for (let i = 0; i < obj['children'].length; i++) {
      createSceneObjByJson(obj['children'][i], xbsjEarthUi)
    }
  }
}
export function meargeObj(root: any, xbsjEarthUi: XbsjEarthUi) {
  //推拽scenejson合并
  const obj = root.sceneTree.root
  if (obj) {
    createSceneObjByJson(obj, xbsjEarthUi)
  }
}
export function geojsonToPointsLinesPolygons(geojson: any) {
  var result = {
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

function convertGeometry(
  geometry: { type: any; coordinates: any[]; geometries: any[]; geometry: any },
  result: { points: any; lines: any; polygons: any },
  properties?: any
) {
  // console.log('properties', properties);

  switch (geometry.type) {
    case 'Point':
      result.points.push({ coordinates: geometry.coordinates, properties })
      break
    case 'MultiPoint':
      geometry.coordinates.forEach(function (point: any[], index) {
        result.points.push({ coordinates: point, properties }) // Assuming exterior ring
      })
      break
    case 'LineString':
      result.lines.push({ coordinates: geometry.coordinates, properties })
      break
    case 'MultiLineString':
      geometry.coordinates.forEach(function (line: any[]) {
        result.lines.push({ coordinates: line, properties }) // Assuming exterior ring
      })
      break
    case 'Polygon':
      geometry.coordinates.forEach(function (polygon: any[]) {
        // result.polygons.push(polygon); // Assuming exterior ring
        result.polygons.push({ polygon, properties }) // Assuming exterior ring
      })
      break
    case 'MultiPolygon':
      geometry.coordinates.forEach(function (polygon: any[]) {
        result.polygons.push({ polygon: polygon[0], properties }) // Assuming exterior ring
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
export function createLines(xbsjEarthUi: XbsjEarthUi, lines: any, linesGroup: SceneTreeItem) {
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
    const treeItem = xbsjEarthUi.sceneTree.createSceneObjectTreeItem(
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
export function createpoints(xbsjEarthUi: XbsjEarthUi, points: any, pointsGroup: SceneTreeItem) {
  points.forEach((element: any, index: number) => {
    // console.log('createpoints', element);
    const position =
      element.coordinates.length === 2
        ? ([...element.coordinates, 0] as [number, number, number])
        : element.coordinates
    const treeItem = xbsjEarthUi.sceneTree.createSceneObjectTreeItem(
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
  xbsjEarthUi: XbsjEarthUi,
  polygons: any,
  polygonsGroup: SceneTreeItem
) {
  polygons.forEach((element: any, index: number) => {
    // console.log('createpolygons', element);
    let points: [number, number, number][] = []
    element.polygon.forEach((item: [number, number] | [number, number, number]) => {
      if (item.length === 2) {
        points.push([...item, 0])
      } else if (item.length === 3) {
        points.push(item)
      }
    })
    const treeItem = xbsjEarthUi.sceneTree.createSceneObjectTreeItem(
      'ESGeoPolygon',
      undefined,
      polygonsGroup,
      'Inner'
    ) as SceneTreeItem
    const sceneObject = treeItem.sceneObject as ESGeoPolygon
    sceneObject.points = points
    // sceneObject.materialMode = "cord"
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
export function searchGeoObjsValues(xbsjEarthUi: XbsjEarthUi, sceneObjList: any[]) {
  let result: any = {
    type: 'FeatureCollection',
    features: []
  }
  sceneObjList.forEach((item) => {
    if (item) {
      if (item instanceof ESObjectWithLocation) {
        const a = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: item.position
          },
          properties: {
            name: item.name
          }
        }
        result.features.push(a)
      } else if (item instanceof ESGeoLineString) {
        const a = {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: item.points
          },
          properties: {
            name: item.name
          }
        }
        result.features.push(a)
      } else if (item instanceof ESGeoVector) {
        const a = {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates:
              item.points && item.points.length > 0 ? [[...item.points, item.points[0]]] : []
          },
          properties: {
            name: item.name
          }
        }
        result.features.push(a)
      }
    }
  })
  return result
}

//保存到本地
export type FileHandleType = {
  readonly kind: string
  readonly name: string
}
const acceptsOptions = {
  json: {
    description: 'JSON Files',
    accept: {
      'text/json': '.json'
    }
  },
  js: {
    description: 'JS Files',
    accept: {
      'text/js': '.js'
    }
  },
  txt: {
    description: 'Text Files',
    accept: {
      'text/plain': ['.txt', '.text']
    }
  },
  geoJson: {
    description: 'geoJson Files',
    accept: {
      'text/geoJson': '.geoJson'
    }
  }
}
export async function saveFileHandle(
  type?: 'txt' | 'js' | 'json' | 'geoJson',
  suggestedName?: string
) {
  const option = acceptsOptions[type ?? 'json']
  try {
    // @ts-ignore
    const handle = await showSaveFilePicker({
      suggestedName: suggestedName ?? `未命名.${type ?? 'json'}`,
      types: [option]
    })
    return handle as FileHandleType | undefined
  } catch (error) {
    console.warn(`getSaveFileHandle error: ${error}`)
    return undefined
  }
}
export async function save(handle: FileHandleType, str: string) {
  //.js .txt .json都可使用
  const blob = new Blob([str], { type: 'text/plain;charset=utf-8' })
  // @ts-ignore
  const writable = await handle.createWritable()
  await writable.write(blob)
  await writable.close()
}
//寻找场景树上的所有被选择的对象节点
function searchCheckedTreeItem(
  xbsjEarthUi: XbsjEarthUi,
  innerobjItem: SceneTreeItem,
  result: any[]
) {
  if (innerobjItem.sceneObject) {
    const checked = innerobjItem.uiTreeObject.checkedStatus
    if (checked === 'checked') {
      result.push(innerobjItem.sceneObject)
    }
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      //@ts-ignore
      searchCheckedTreeItem(xbsjEarthUi, innerobjItem.children._innerObj[i], result)
    }
  }
}
export function searchCheckedTreeItems(xbsjEarthUi: XbsjEarthUi) {
  let result: any[] = []
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree && sceneTree.children._innerObj) {
    const innerobj = sceneTree.children._innerObj
    for (let index = 0; index < innerobj.length; index++) {
      searchCheckedTreeItem(xbsjEarthUi, innerobj[index], result)
    }
  }
  return result
}

//寻找场景树上的所有的对象节点
function searchSceneObjectTreeItem(
  xbsjEarthUi: XbsjEarthUi,
  innerobjItem: SceneTreeItem,
  result: any[]
) {
  if (innerobjItem.sceneObject) {
    result.push(innerobjItem.sceneObject)
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      //@ts-ignore
      searchSceneObjectTreeItem(xbsjEarthUi, innerobjItem.children._innerObj[i], result)
    }
  }
}
export function searchSceneObjectTreeItems(xbsjEarthUi: XbsjEarthUi) {
  let result: any[] = []
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree && sceneTree.children._innerObj) {
    const innerobj = sceneTree.children._innerObj
    for (let index = 0; index < innerobj.length; index++) {
      searchSceneObjectTreeItem(xbsjEarthUi, innerobj[index], result)
    }
  }
  return result
}

//寻找某个文件夹的所有被选择的对象节点
function searchCheckedFromFolder(innerobjItem: SceneTreeItem, result: any[]) {
  if (innerobjItem.sceneObject) {
    const checked = innerobjItem.uiTreeObject.checkedStatus
    if (checked === 'checked') {
      result.push(innerobjItem.sceneObject)
    }
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      //@ts-ignore
      searchCheckedFromFolder(innerobjItem.children._innerObj[i], result)
    }
  }
}
export function searchCheckedFromFolders(SceneTreeItem: SceneTreeItem) {
  let result: any[] = []
  if (SceneTreeItem && SceneTreeItem.children && SceneTreeItem.children._innerObj) {
    const innerobj = SceneTreeItem.children._innerObj
    for (let index = 0; index < innerobj.length; index++) {
      //@ts-ignore
      searchCheckedFromFolder(innerobj[index], result)
    }
  }
  return result
}

//寻找某个文件夹上的所有的对象节点
function searchSceneObjectFromFolder(innerobjItem: SceneTreeItem, result: any[]) {
  if (innerobjItem.sceneObject) {
    result.push(innerobjItem.sceneObject)
  }
  if (innerobjItem.children) {
    for (let i = 0; i < innerobjItem.children.length; i++) {
      //@ts-ignore
      searchSceneObjectFromFolder(innerobjItem.children._innerObj[i], result)
    }
  }
}
export function searchSceneObjectFromFolders(SceneTreeItem: SceneTreeItem) {
  let result: any[] = []

  if (SceneTreeItem && SceneTreeItem.children && SceneTreeItem.children._innerObj) {
    const innerobj = SceneTreeItem.children._innerObj
    for (let index = 0; index < innerobj.length; index++) {
      //@ts-ignore
      searchSceneObjectFromFolder(innerobj[index], result)
    }
  }
  return result
}

//寻找场景树上的所有的在选中列表里面的espath
function searchEspathFromChannels(xbsjEarthUi: XbsjEarthUi, list: SceneTreeItem, result: ESPath[]) {
  if (list.sceneObject instanceof ESPath) {
    result.push(list.sceneObject)
  }
  if (list.children) {
    for (let i = 0; i < list.children.length; i++) {
      //@ts-ignore
      searchEspathFromChannels(xbsjEarthUi, list.children._innerObj[i], result)
    }
  }
}
export function searchAllEspathFromselectItem(xbsjEarthUi: XbsjEarthUi) {
  let result: ESPath[] = []
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree) {
    const list = [...sceneTree.selectedItems]
    for (let index = 0; index < list.length; index++) {
      searchEspathFromChannels(xbsjEarthUi, list[index], result)
    }
  }
  return result
}

//寻找场景树上的所有的在选中列表里面的ESObjectWithLocation
function searchESObjectWithLocationFromChannels(
  xbsjEarthUi: XbsjEarthUi,
  list: SceneTreeItem,
  result: ESObjectWithLocation[]
) {
  if (list.sceneObject instanceof ESObjectWithLocation) {
    result.push(list.sceneObject)
  }
  if (list.children) {
    for (let i = 0; i < list.children.length; i++) {
      //@ts-ignore
      searchESObjectWithLocationFromChannels(xbsjEarthUi, list.children._innerObj[i], result)
    }
  }
}
export function searchAllESObjectWithLocationFromselectItem(xbsjEarthUi: XbsjEarthUi) {
  let result: ESObjectWithLocation[] = []
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (sceneTree) {
    const list = [...sceneTree.selectedItems]
    for (let index = 0; index < list.length; index++) {
      searchESObjectWithLocationFromChannels(xbsjEarthUi, list[index], result)
    }
  }
  return result
}

export const geoJsonTOESObjects = (xbsjEarthUi: XbsjEarthUi, a: any) => {
  let geo_data
  if (a.type === 'Topology') {
    geo_data = topojson.mesh(a)
  } else {
    geo_data = a
  }
  messageBox({
    text: '请选择要转换的对象',
    cancelButtonText: 'ESGeojson',
    confirmButtonText: '矢量对象集合',
    title: '提示'
  })
    .then(() => {
      const b = geojsonToPointsLinesPolygons(geo_data)
      if (b.points.length > 0 || b.lines.length > 0 || b.polygons.length > 0) {
        const group = xbsjEarthUi.sceneTree.createGroupTreeItem('Geojson')
        if (b.points.length > 0) {
          const pointsGroup = xbsjEarthUi.sceneTree.createGroupTreeItem(
            'points',
            undefined,
            group,
            'Inner'
          ) as SceneTreeItem
          createpoints(xbsjEarthUi, b.points, pointsGroup)
        }
        if (b.lines.length > 0) {
          const linesGroup = xbsjEarthUi.sceneTree.createGroupTreeItem(
            'lines',
            undefined,
            group,
            'Inner'
          ) as SceneTreeItem
          createLines(xbsjEarthUi, b.lines, linesGroup)
        }
        if (b.polygons.length > 0) {
          const polygonsGroup = xbsjEarthUi.sceneTree.createGroupTreeItem(
            'polygons',
            undefined,
            group,
            'Inner'
          ) as SceneTreeItem
          createpolygons(xbsjEarthUi, b.polygons, polygonsGroup)
        }
      }
    })
    .catch((err) => {
      const sceneTree = xbsjEarthUi.sceneTree
      const currentTreeItem = sceneTree.lastSelectedItem
      let newTreeItem
      if (!currentTreeItem) {
        newTreeItem = sceneTree.createSceneObjectTreeItem('ESGeoJson')
      } else if (currentTreeItem?.type === 'Folder') {
        newTreeItem = sceneTree.createSceneObjectTreeItem(
          'ESGeoJson',
          undefined,
          currentTreeItem,
          'Inner'
        )
      } else {
        newTreeItem = sceneTree.createSceneObjectTreeItem(
          'ESGeoJson',
          undefined,
          currentTreeItem,
          'After'
        )
      }
      if (!newTreeItem) return
      sceneTree.uiTree.clearAllSelectedItems()
      newTreeItem.uiTreeObject.selected = true
      if (!newTreeItem.sceneObject) return
      if (newTreeItem.sceneObject.typeName !== 'ESGeoJson') return
      const sceneObject = newTreeItem.sceneObject as ESGeoJson
      xbsjEarthUi.propSceneTree = newTreeItem
      const index = getsceneObjNumfromSceneTree(xbsjEarthUi, 'ESGeoJson')
      const name = 'GeoJson' + (index + 1)
      sceneObject.url = a
      sceneObject.name = name
      console.log(err)
    })
}
export const createSceneJson = (xbsjEarthUi: XbsjEarthUi, resultJson: any) => {
  messageBox({
    text: '请选择替换场景还是合并场景?',
    cancelButtonText: '合并',
    confirmButtonText: '替换',
    title: '选择'
  })
    .then(() => {
      xbsjEarthUi.json = resultJson
      const json = resultJson.viewers[0]
      if (!json) return
      const id = json.id
      const type = json.type
      const lastView = resultJson.lastView
      const dispose = xbsjEarthUi.viewerCreatedEvent.donce((viewer) => {
        if (lastView && lastView.position && lastView.rotation) {
          viewer.flyIn(lastView.position, lastView.rotation)
        }
        dispose()
      })
      if (id && type) {
        if (type === 'ESCesiumViewer') {
          const viewer = xbsjEarthUi.switchToCesiumViewer({
            container: 'viewersContainer',
            destroy: true,
            id,
            attributeSync: false
          })
          viewer.json = json
        } else if (type === 'ESUeViewer') {
          const extras = json.extras
          if (!extras) return
          const uri = extras.uri
          const app = extras.app
          if (uri && app) {
            const options = {
              container: 'viewersContainer',
              uri,
              app,
              destroy: true,
              id: 'earthui-active-viewer-id',
              attributeSync: false
            } as ESJSwitchToUEViewerOptionType
            const viewer = xbsjEarthUi.switchToUEViewer(options)
            viewer.json = json
          }
        }
      }
    })
    .catch((err) => {
      meargeObj(resultJson, xbsjEarthUi)
    })
}
export const createObj = (xbsjEarthUi: XbsjEarthUi, a: any) => {
  const sceneTree = xbsjEarthUi.getSceneTree()
  if (!sceneTree) return
  const treeItem = sceneTree.createSceneObjectTreeItemFromJson(a)
  if (treeItem) {
    sceneTree.uiTree.clearAllSelectedItems()
    treeItem.uiTreeObject.selected = true
  }
}

/**
 * 保存json文件
 * @param json
 * @param name
 */
export const saveAs = async (json: JsonValue, name?: string) => {
  ElMessage.warning('正在另存为..')
  try {
    // 判断如果是字符串直接使用，否则转换为JSON字符串
    const content = typeof json === 'string' ? json : JSON.stringify(json, null, 2)
    // 创建Blob对象
    const blob = new Blob([content], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name?.endsWith('.json') ? name : `${name || '未命名'}.json`
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    }, 100)

    ElMessage.success('另存成功!')
  } catch (error) {
    ElMessage.error(`另存失败! error: ${error instanceof Error ? error.message : String(error)}`)
  }
}
