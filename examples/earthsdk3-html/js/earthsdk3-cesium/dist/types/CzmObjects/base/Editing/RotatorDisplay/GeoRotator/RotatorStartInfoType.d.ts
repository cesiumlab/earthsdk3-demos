import * as Cesium from 'cesium';
import { RotatorPlaneType } from './RotatorPlaneType';
export type RotatorStartInfoType = {
    currentPlaneType: RotatorPlaneType;
    currentD2c: number;
    currentV: Cesium.Cartesian3 | undefined;
    startRotation: number;
    pointerId: number;
};
