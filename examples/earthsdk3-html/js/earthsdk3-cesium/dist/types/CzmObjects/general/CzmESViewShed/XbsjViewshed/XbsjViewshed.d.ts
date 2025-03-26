/// <reference types="@czmSrc/__declares/__cesium" />
/**
 * 视域分析类
 */
export class XbsjViewshed {
    constructor(scene: any);
    _updateFov(): void;
    _fovH: number;
    _fovV: number;
    _scene: any;
    _frustum: Cesium.PerspectiveFrustum;
    _spotLightCamera: Cesium.Camera;
    _viewshedShadowMap: Cesium.ShadowMap;
    _debugCameraPrimitive: ViewshedPrimitive;
    _enabledChangedEvent: Cesium.Event<(...args: any[]) => void>;
    update(frameState: any): void;
    setView(options: any): void;
    get enabledChangedEvent(): Cesium.Event<(...args: any[]) => void>;
    isDestroyed(): boolean;
    destroy(): void;
}
import * as Cesium from "cesium";
import { ViewshedPrimitive } from "./ViewshedPrimitive";
