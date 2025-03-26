import { ESJColor } from "earthsdk3";
export type WaterAttributeType = {
    waterColor?: ESJColor;
    frequency?: number;
    waveVelocity?: number;
    amplitude?: number;
    specularIntensity?: number;
    flowDirection?: number;
    flowSpeed?: number;
};
