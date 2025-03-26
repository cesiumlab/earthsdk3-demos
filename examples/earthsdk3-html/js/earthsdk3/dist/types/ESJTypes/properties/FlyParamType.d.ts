import { ESJVector3D } from "./DataType";
/**
 * @description  flyTo参数
 * @param distance 相机距离目标点的距离
 * @param heading 相机朝向目标点的方向
 * @param pitch 相机俯仰角
 * @param flyDuration 飞行时间
 * @param hDelta 相机水平偏移量
 * @param pDelta 相机垂直偏移量
 */
export type ESJFlyToParam = {
    distance: number;
    heading: number;
    pitch: number;
    flyDuration: number;
    hDelta: number;
    pDelta: number;
};
/**
 * @description  flyIn参数
 * @param position 相机位置
 * @param rotation 相机旋转
 * @param flyDuration 飞行时间
 */
export type ESJFlyInParam = {
    position: ESJVector3D;
    rotation: ESJVector3D;
    flyDuration: number;
};
