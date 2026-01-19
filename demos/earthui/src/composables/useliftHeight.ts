import { getLiftHeightValue } from '@/components'
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
        const addHeight = await getLiftHeightValue(objNumber)
        if (addHeight === undefined) return

        filterSceneObjectList.forEach((sceneObject) => {
          if (sceneObject instanceof ESObjectWithLocation) {
            const sceneHeight = sceneObject.position[2]
            const newHeight = addHeight + sceneHeight
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
                const point2 = item[2] + addHeight
                const p = [item[0], item[1], point2] as ESJVector3D
                newPoints.push(p)
              })
            }
            sceneObject.points = newPoints
          }
        })

        ElMessage.success(`${objNumber} 个对象已经成功抬升 ${addHeight} m`)
      } catch (error) {
        console.error('抬升失败', error)
      }
    }
  }
}
