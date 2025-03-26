import * as Cesium from 'cesium';
export declare function computeCzmModelMatrix(options: {
    localScale?: [number, number, number];
    initialRotation?: 'xForwardzUp' | 'yForwardzUp';
    localRotation?: [number, number, number];
    localPosition?: [number, number, number];
    localModelMatrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    sceneScaleFromPixelSize?: number;
    scale?: [number, number, number];
    rotation?: [number, number, number];
    position?: [number, number, number];
    modelMatrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
}, target?: Cesium.Matrix4): Cesium.Matrix4 | undefined;
