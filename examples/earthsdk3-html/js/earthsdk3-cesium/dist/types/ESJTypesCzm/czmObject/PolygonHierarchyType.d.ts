import * as Cesium from 'cesium';
export type PolygonHierarchyType = {
    positions: [number, number, number][];
    holes?: PolygonHierarchyType[];
};
export type CesiumPolygonHierarchyType = {
    positions: Cesium.Cartesian3[];
    holes: CesiumPolygonHierarchyType[];
};
