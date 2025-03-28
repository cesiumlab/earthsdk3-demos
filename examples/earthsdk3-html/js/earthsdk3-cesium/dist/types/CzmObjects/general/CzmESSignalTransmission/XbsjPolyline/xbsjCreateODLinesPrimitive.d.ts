/// <reference path="../../../../ESCesiumViewer/initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
export default xbsjCreateODLinesPrimitive;
/**
 * OD线回调函数，用来指定OD线的进度
 */
export type XbsjODLinesPostionCallback = () => any;
/**
 * OD线回调函数，用来指定OD线的进度
 * @callback XbsjODLinesPostionCallback
 * @exports XbsjODLinesPostionCallback
 *
 * @param {number} instanceIndex OD线的索引
 * @param {Cesium.FrameState} frameState 传递的是viewer.scene.frameState
 * @returns {number} 返回OD线的进度位置
 *
 * @example
 * function (instanceIndex, frameState) {
 *     var st = routePaths[instanceIndex].startTime;
 *     var dr = routePaths[instanceIndex].duration;
 *     var diff = time > st ? time - st : time + timeDuration - st;
 *     var timeRatio = Math.min(diff / dr, 1.0);
 *     return timeRatio;
 * }
 */
/**
 * 创建OD线
 * @exports xbsjCreateODLinesPrimitive
 * @param {*} routePaths 用来存储OD线的数据点，有两种形式：
 * @param {XbsjODLinesPostionCallback} postionCallback 用来实时修改OD线的进度位置
 * @param {boolean} translucentPass 是否在透明通道渲染，透明通道渲染的颜色不能叠加，会比较暗。但是不会有深度监测问题。
 * @returns {Cesium.Primitive} 返回创建好的od线
 * @example
 * // routePaths数据的两种存储形式如下：
 *  {
 *      positions: [], // [经度，纬度，高度] 经纬度单位是弧度
 *      color: [1, 1, 0, 1]
 *      width: 2.0, // 宽度
 *  }
 *
 *  {
 *      startPos: [], // [经度，纬度，高度] 经纬度单位是弧度
 *      endPos: [1, 1, 0, 1],
 *      heightRatio: 1.0, // 曲率控制，默认1.0，越大曲线抬得越高
 *      width: 2.0, // 宽度
 *  }
 */
declare function xbsjCreateODLinesPrimitive(routePaths: any, color: any, arcType: any, postionCallback: XbsjODLinesPostionCallback, brightening: boolean | undefined, depthTest: boolean | undefined, getTextureFunc: any, id: any): Cesium.Primitive;
import * as Cesium from "cesium";
