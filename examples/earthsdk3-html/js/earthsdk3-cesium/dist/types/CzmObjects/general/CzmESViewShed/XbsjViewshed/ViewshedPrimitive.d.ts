/// <reference path="../../../../ESCesiumViewer/initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
export class ViewshedPrimitive {
    constructor(options: any);
    modelMatrix: any;
    fovH: any;
    fovV: any;
    segmentH: any;
    segmentV: any;
    subSegmentH: any;
    subSegmentV: any;
    _faceColor: any;
    _lineColor: any;
    show: any;
    _modelMatrix: Cesium.Matrix4;
    _fovH: number;
    _fovV: number;
    _segmentH: number;
    _segmentV: number;
    _subSegmentH: number;
    _subSegmentV: number;
    _boundingSphere: Cesium.BoundingSphere;
    _initBoundingSphere: Cesium.BoundingSphere | undefined;
    _command: Cesium.DrawCommand | undefined;
    _createCommand(context: any): void;
    _shaderprogram: any;
    _lineCommand: Cesium.DrawCommand | undefined;
    update(frameState: any): void;
    isDestroyed(): boolean;
    _destroyVideoMemory(): void;
    destroy(): void;
}
import * as Cesium from "cesium";
