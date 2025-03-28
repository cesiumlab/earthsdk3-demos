/// <reference path="../../../../ESCesiumViewer/initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
/**
 * 视频融合类
 * @class
 *
 * @param {Object} options 相关参数选项
 * @param {Cesium.Matrix4} options.inverseViewMatrix 视频融合的姿态矩阵
 * @param { () => Cesium.Texture | undefined } options.videoTextureFunc 源视频回调
 * @param { () => Cesium.Texture | undefined } options.alphaTextureFunc 遮罩视频回调
 * @param {boolean} options.showHelperPrimitive 是否显示辅助线框
 * @param {Cesium.Frustum} options.frustum 视频融合的投影体
 */
export function XbsjCameraVideo(options: {
    inverseViewMatrix: Cesium.Matrix4;
    videoTextureFunc: () => Cesium.Texture | undefined;
    alphaTextureFunc: () => Cesium.Texture | undefined;
    showHelperPrimitive: boolean;
    frustum: Cesium.Frustum;
}): void;
export class XbsjCameraVideo {
    /**
     * 视频融合类
     * @class
     *
     * @param {Object} options 相关参数选项
     * @param {Cesium.Matrix4} options.inverseViewMatrix 视频融合的姿态矩阵
     * @param { () => Cesium.Texture | undefined } options.videoTextureFunc 源视频回调
     * @param { () => Cesium.Texture | undefined } options.alphaTextureFunc 遮罩视频回调
     * @param {boolean} options.showHelperPrimitive 是否显示辅助线框
     * @param {Cesium.Frustum} options.frustum 视频融合的投影体
     */
    constructor(options: {
        inverseViewMatrix: Cesium.Matrix4;
        videoTextureFunc: () => Cesium.Texture | undefined;
        alphaTextureFunc: () => Cesium.Texture | undefined;
        showHelperPrimitive: boolean;
        frustum: Cesium.Frustum;
    });
    videoTextureFunc: () => Cesium.Texture | undefined;
    alphaTextureFunc: () => Cesium.Texture | undefined;
    /**
     * 视频融合的姿态矩阵
     * @member {Cesium.Matrix4}
     * */
    inverseViewMatrix: Cesium.Matrix4;
    _inverseViewMatrix: Cesium.Matrix4;
    frustum: any;
    _boxMV: Cesium.Matrix4;
    _primitiveModelMatrix: Cesium.Matrix4;
    _inverseBoxMV: Cesium.Matrix4;
    _primitive: Cesium.ClassificationPrimitive;
    _helperPrimitive: Cesium.Primitive;
    _projectionMatrix: Cesium.Matrix4;
    _inverseViewProjectionMatrix: Cesium.Matrix4;
    _viewProjectionMatrix: Cesium.Matrix4;
    /**
     * 是否显示视频融合
     * @member {boolean}
     */
    show: boolean;
    private update;
    _scratchCartesian: any;
    _scratchBS: any;
    /**
     * 视频融合类是否被销毁
     * @returns {boolean} true表示已经销毁
     */
    isDestroyed(): boolean;
    /**
     * 销毁视频融合类
     * @returns {*} 销毁成功会返回undefined
     */
    destroy(): any;
}
import * as Cesium from "cesium";
