import { getNoToken } from '@/api/service'
import { getsceneObjNumfromSceneTree } from '@/scripts/general'
import { XbsjEarthUi } from '@/scripts/xbsjEarthUi'
import { getUuid } from '@/utils'
import { MenuItem } from 'earthsdk-ui'
import {
  ESGeoJson,
  ESGeoLineString,
  ESGeoVector,
  ESObjectWithLocation,
  ESSceneObject
} from 'earthsdk3'
import { ElMessage, ElMessageBox } from 'element-plus'

export async function mergeESGeoJson(sceneObjList: ESSceneObject[]) {
  const result = {
    type: 'FeatureCollection',
    features: [] as any[]
  }

  const sceneObjectIds: string[] = [];

  for (const item of sceneObjList) {
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
        result.features.push(a);
        sceneObjectIds.push(item.id);
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
        result.features.push(a);
        sceneObjectIds.push(item.id);
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
        result.features.push(a);
        sceneObjectIds.push(item.id);
      } else if (item instanceof ESGeoJson) {
        const json = await getGeoJsonFromUrl(item.url);
        if (json) {
          result.features.push(...json.features);
          sceneObjectIds.push(item.id);
        }
      }
    }
  }

  return { result, sceneObjectIds };
}

export const getGeoJsonFromUrl = async (url: any) => {
  try {
    if (!url) return null;
    if (typeof url === "string") {
      const json = await getNoToken(url);
      return json;
    } else {
      return url;
    }
  } catch (error) {
    console.error(error);
    ElMessage.warning('获取 GeoJson 异常！')
    return null;
  }
}


export const getMergeToESGeoJsonMenuContent = (
  objm: XbsjEarthUi,
  sceneObjectList: ESSceneObject[]
): MenuItem => {
  return {
    text: '合并为 ESGeoJson',
    keys: '',
    func: async () => {
      try {
        const { result, sceneObjectIds } = await mergeESGeoJson(sceneObjectList);
        if (sceneObjectIds.length <= 0) {
          ElMessage.warning('没有符合条件的对象');
          return
        }
        ElMessageBox.confirm(`合并为 ESGeoJson 后会删除原对象(${sceneObjectIds.length}个)，确定合并?`).then(() => {
          const treeItem = objm.sceneTree.createSceneObjectTreeItemFromJson(
            {
              type: 'ESGeoJson',
              id: getUuid(),
              url: result,
              name: 'Merge_ESGeoJson' + (getsceneObjNumfromSceneTree(objm, 'ESGeoJson') + 1),
              textStyle: { ...ESGeoJson.defaults.textStyle, textProperty: 'name' }
            }
          )

          sceneObjectIds.forEach((id) => {
            const item = objm.sceneTree.getTreeItemFromSceneObjId(id);
            if (item && !item.isDestroyed()) {
              item.detachFromParent()
            }
          });

          ElMessage.success('合并成功 ' + (treeItem?.name || ''));
        })
      } catch (error) {
        console.error(error)
        ElMessage.error('合并失败')
      }
    },
  }
}
