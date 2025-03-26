import * as Cesium from 'cesium';
export declare function capture(scene: Cesium.Scene, width?: number, height?: number, format?: 'image/jpeg' | 'image/png'): Promise<string>;
