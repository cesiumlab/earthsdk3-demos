import { downloadJson } from '@/utils'
import { MenuItem } from 'earthsdk-ui'
import {
  ESGeoLineString,
  ESGeoVector,
  ESObjectWithLocation,
  ESSceneObject,
  SceneTree,
  SceneTreeItem
} from 'earthsdk3'
import { dayjs, ElMessage } from 'element-plus'
import { getSceneObjectsForMenu } from './useSceneTreeItem'

export function transformToGeoJson(sceneObjList: ESSceneObject[]) {
  const result = {
    type: 'FeatureCollection',
    features: [] as any[]
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

export const getGeoJsonMenuContent = (
  sceneTree: SceneTree,
  showCheckbox: boolean,
  treeItem?: SceneTreeItem
): MenuItem => {
  const tags = {
    sceneTree: '导出全部为 GeoJSON',
    selected: '导出选中项为 GeoJSON',
    treeItem: '导出该项为 GeoJSON',
    checked: '导出已勾选项为 GeoJSON'
  }

  const { sceneObjects, tag } = getSceneObjectsForMenu(sceneTree, showCheckbox, treeItem)
  return {
    text: tags[tag],
    keys: '',
    func: async () => {
      try {
        const geoJson = transformToGeoJson(sceneObjects)
        if (geoJson.features.length === 0) {
          ElMessage.warning(`未筛选到可导出对象`)
          return
        }
        const flag = await downloadJson(
          geoJson,
          'earth_ui_scene' + dayjs().format('_MM_DD') + '.geojson'
        )
        if (flag) {
          ElMessage.success(`成功导出 ${geoJson.features.length} 个对象`)
        } else {
          ElMessage.error('导出失败')
        }
      } catch (error) {
        console.error(error)
        ElMessage.error(`导出失败`)
      }
    }
  }
}
