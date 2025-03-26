import * as Cesium from 'cesium';
export declare function getQuaternionWithYForwardZUp(rotation: [number, number, number], result?: Cesium.Quaternion): Cesium.Quaternion;
export declare function getQuaternionWithXForwardZUp(rotation: [number, number, number], result?: Cesium.Quaternion): Cesium.Quaternion;
export declare function getQuaternion(rotation: [number, number, number], forwardAxis: Cesium.Cartesian3, upAxis: Cesium.Cartesian3, rightAxis: Cesium.Cartesian3, result?: Cesium.Quaternion): Cesium.Quaternion;
