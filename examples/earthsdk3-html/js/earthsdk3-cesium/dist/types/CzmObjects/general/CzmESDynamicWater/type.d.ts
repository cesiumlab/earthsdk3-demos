import { ESJColor } from "earthsdk3";
export type WaterAttribute = {
    waterColor?: ESJColor;
    frequency?: number;
    waveVelocity?: number;
    amplitude?: number;
    specularIntensity?: number;
    flowDirection?: number;
    flowSpeed?: number;
};
export declare const waterType: {
    [xx: string]: WaterAttribute;
};
