import * as Cesium from 'cesium';
/**
 * 指定一个position，获取一个1米宽的实际物体需要放大多少倍，才能覆盖pixelSize大小的屏幕。
 * 返回值要么大于0，要么为undefeind，只有这两种情况！
 * 如果返回值为undefined，表示计算结果有问题，不能使用！
 * @param scene
 * @param position
 * @param pixelSize
 * @returns
 */
export declare function getSceneScaleForScreenPixelSize(scene: Cesium.Scene, position: Cesium.Cartesian3, pixelSize: number): number | undefined;
