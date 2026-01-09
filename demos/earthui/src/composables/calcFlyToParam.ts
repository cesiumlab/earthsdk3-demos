import {
  ESLocalSkyBox,
  ESObjectsManager,
  ESObjectWithLocation,
  ESVisualObject,
  SceneTreeItem,
} from "earthsdk3";
import { ElMessage } from "element-plus";

/**
 * 保存飞行视角
 * @param sceneObject
 */
export const saveFlyInParams = (
  objm: ESObjectsManager,
  sceneObject: ESVisualObject
) => {
  const res = objm.activeViewer?.getCurrentCameraInfo();
  if (!res) {
    ElMessage.warning("无法获取视角");
    return;
  }
  sceneObject.flyInParam = {
    position: res.position,
    rotation: res.rotation,
    flyDuration: 1,
  };
  ElMessage.success("保存成功");
};

/**
 * 保存参数
 * @param treeItem
 */
export const calcFlyToParam = async (
  objm: ESObjectsManager,
  treeItem: SceneTreeItem
) => {
  const { sceneObject } = treeItem;
  if (!sceneObject) return;

  if (sceneObject instanceof ESLocalSkyBox) {
    saveFlyInParams(objm, sceneObject);
  } else if (sceneObject instanceof ESObjectWithLocation) {
    sceneObject.calcFlyToParam();
    ElMessage.success("保存成功");
  } else {
    saveFlyInParams(objm, sceneObject as ESVisualObject);
  }
};
