import { ESCesiumViewer } from '../../../../ESCesiumViewer';
import { Destroyable, Event, SceneObjectKey, UniteChanged } from 'xbsj-base';
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
export declare class CzmWater extends Destroyable {
    private _primitive?;
    private _flyToEvent;
    get flyToEvent(): Event<[duration: number]>;
    flyTo(duration: number): void;
    private _updateBoundingSphereEvent;
    get updateBoundingSphereEvent(): Event<[boolean]>;
    updateBoundingSphere(update: boolean): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmWater {
    const createDefaultProps: () => {
        show: boolean;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        allowPicking: boolean;
        waterColor: ESJColor;
        blendColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        specularMap: string | undefined;
        normalMap: string;
        frequency: number;
        animationSpeed: number;
        amplitude: number;
        specularIntensity: number;
        baseWaterImage: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        } | undefined>;
        flowSpeed: number;
        stRotation: number | undefined;
        ground: boolean | undefined;
    };
}
export interface CzmWater extends UniteChanged<ReturnType<typeof CzmWater.createDefaultProps>> {
}
