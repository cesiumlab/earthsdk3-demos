import { ESJColor, ESJVector2D, ESJVector3D, ESJVector4D } from "earthsdk3";
export type CzmPointPrimitiveType = {
    show?: boolean;
    color?: ESJColor;
    disableDepthTestDistance?: number;
    distanceDisplayCondition?: ESJVector2D;
    outlineColor?: ESJColor;
    outlineWidth?: number;
    pixelSize?: number;
    position?: ESJVector3D;
    scaleByDistance?: ESJVector4D;
    translucencyByDistance?: ESJVector4D;
};
