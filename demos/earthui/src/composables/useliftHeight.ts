import { getLiftHeightValue } from './funcLiftHeight'
import { MenuItem } from 'earthsdk-ui'
import {
  ESGeoVector,
  ESJVector3D,
  ESJVector3DArray,
  ESObjectWithLocation,
  ESSceneObject
} from 'earthsdk3'
import { ElMessage } from 'element-plus'

export const getLiftHeightMenuContent = (
  sceneObjects: ESSceneObject[],
  tag: 'selected' | 'sceneTree'
): MenuItem => {
  const tags = {
    sceneTree: '抬升全部项高度',
    selected: '抬升选中项高度'
  }
  return {
    text: tags[tag],
    keys: '',
    func: async () => {
      try {
        const filterSceneObjectList = sceneObjects.filter(
          (item) => item instanceof ESObjectWithLocation || item instanceof ESGeoVector
        )

        const objNumber = filterSceneObjectList.length

        if (objNumber === 0) {
          ElMessage.warning('当前没有符合可抬升的对象，请重新选择')
          return
        }
        const option = await getLiftHeightValue(objNumber)
        if (option === undefined) return;
        const { value, type } = option;

        filterSceneObjectList.forEach((sceneObject) => {
          if (sceneObject instanceof ESObjectWithLocation) {
            const sceneHeight = sceneObject.position[2]
            const newHeight = type === 'add' ? value + sceneHeight : value;
            const position = [
              sceneObject.position[0],
              sceneObject.position[1],
              newHeight
            ] as ESJVector3D
            sceneObject.position = position
          } else if (sceneObject instanceof ESGeoVector) {
            const points = sceneObject.points
            const newPoints: ESJVector3DArray = []
            if (points && points.length > 0) {
              points.forEach((item) => {
                const point2 = type === 'add' ? value + item[2] : value;
                const p = [item[0], item[1], point2] as ESJVector3D
                newPoints.push(p)
              })
            }
            sceneObject.points = newPoints
          }
        })

        ElMessage.success(`${objNumber} 个对象已经成功抬升${type === 'add' ? '了' : '至'} ${value} m`)
      } catch (error) {
        console.error('抬升失败', error)
      }
    }
  }
}
