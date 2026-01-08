import {
  ESGeoLineString,
  ESGeoVector,
  ESObjectWithLocation,
  ESSceneObject,
  SceneTree,
  SceneTreeItem,
} from "earthsdk3";
import { dayjs, ElMessage } from "element-plus";
import {
  getCheckedSceneObjectsFromTree,
  getSceneObjectsFromTree,
} from "./useSceneTreeItem";
import { downloadJson } from "@/utils";

export const transformToGeoJson = (
  sceneTree: SceneTree,
  showCheckbox: boolean
) => {
  let sceneObjectList: ESSceneObject[] = [];
  if (showCheckbox) {
    sceneObjectList = getCheckedSceneObjectsFromTree(sceneTree);
  } else {
    sceneObjectList = getSceneObjectsFromTree(sceneTree);
  }
  const geoJson = sceneObjectsToGeoJson(sceneObjectList);
  return geoJson;
};

export function sceneObjectsToGeoJson(sceneObjList: ESSceneObject[]) {
  const result = {
    type: "FeatureCollection",
    features: [] as any[],
  };
  sceneObjList.forEach((item) => {
    if (item) {
      if (item instanceof ESObjectWithLocation) {
        const a = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: item.position,
          },
          properties: {
            name: item.name,
          },
        };
        result.features.push(a);
      } else if (item instanceof ESGeoLineString) {
        const a = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: item.points,
          },
          properties: {
            name: item.name,
          },
        };
        result.features.push(a);
      } else if (item instanceof ESGeoVector) {
        const a = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates:
              item.points && item.points.length > 0
                ? [[...item.points, item.points[0]]]
                : [],
          },
          properties: {
            name: item.name,
          },
        };
        result.features.push(a);
      }
    }
  });
  return result;
}
