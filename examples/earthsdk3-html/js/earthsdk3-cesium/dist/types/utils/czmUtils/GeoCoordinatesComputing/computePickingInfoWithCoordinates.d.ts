import * as Cesium from 'cesium';
export type CoordinatesComputingPickingInfo = {
    constraintMode: 'x' | 'y' | 'z' | 'xy' | 'zAxis' | 'none';
    startDragPos: [number, number, number];
};
export type GeoCoordinatesComputingInfo = {
    readonly position: [number, number, number];
    readonly dimensions: [number, number, number];
    readonly heading: number;
};
export declare function computePickingInfoWithCoordinates(pointerEvent: MouseEvent, scene: Cesium.Scene, coordinates: GeoCoordinatesComputingInfo, axisSnapPixelSize: number, result: CoordinatesComputingPickingInfo, disabledOptions?: {
    x?: boolean;
    y?: boolean;
    xy?: boolean;
    z?: boolean;
    zAxis?: boolean;
}): true | undefined;
