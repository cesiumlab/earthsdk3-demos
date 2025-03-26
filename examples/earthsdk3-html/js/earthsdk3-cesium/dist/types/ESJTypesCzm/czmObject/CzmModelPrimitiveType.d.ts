import * as Cesium from 'cesium';
import { ESViewer } from "earthsdk3";
import { CzmModelPrimitive } from '../../CzmObjects';
export type CzmPassType = 'ENVIRONMENT' | 'COMPUTE' | 'GLOBE' | 'TERRAIN_CLASSIFICATION' | 'CESIUM_3D_TILE' | 'CESIUM_3D_TILE_CLASSIFICATION' | 'CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW' | 'OPAQUE' | 'TRANSLUCENT' | 'OVERLAY' | 'NUMBER_OF_PASSES';
export type CzmModelNodeTransformation = {
    translationX: number;
    translationY: number;
    translationZ: number;
    rotationHeading: number;
    rotationPitch: number;
    rotationRoll: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
};
export type CzmModelNodeTransformations = {
    [nodeName: string]: CzmModelNodeTransformation;
};
export type CzmModelAnimationLoopType = 'NONE' | 'REPEAT' | 'MIRRORED_REPEAT';
export type CzmModelAnimationType = {
    name?: string;
    index?: number;
    startTime?: Cesium.JulianDate;
    delay?: number;
    stopTime?: Cesium.JulianDate;
    removeOnStop?: boolean;
    multiplier?: number;
    reverse?: boolean;
    loop?: Cesium.ModelAnimationLoop;
    animationTime?: (duration: number, seconds: number) => number;
};
export type CzmModelAnimationJsonType = {
    name?: string;
    index?: number;
    startTime?: number;
    delay?: number;
    stopTime?: number;
    removeOnStop?: boolean;
    multiplier?: number;
    reverse?: boolean;
    loop?: CzmModelAnimationLoopType;
    animationTime?: string;
};
export type CzmModelPrimitiveCustomShaderClassType = {
    destroy(): undefined;
    get customShader(): any;
};
export type CzmModelPrimitiveCustomShaderInstanceClassType = new (czmModelPrimitive: CzmModelPrimitive, viewer: ESViewer) => CzmModelPrimitiveCustomShaderClassType;
