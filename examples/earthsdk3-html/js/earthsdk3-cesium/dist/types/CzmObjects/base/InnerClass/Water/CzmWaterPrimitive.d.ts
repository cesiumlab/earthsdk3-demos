import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Event, SceneObjectKey, UniteChanged } from "xbsj-base";
import { ESJColor } from "earthsdk3";
export declare class CzmWaterPrimitive extends Destroyable {
    private _primitive?;
    private _flyToEvent;
    get flyToEvent(): Event<[duration: number]>;
    flyTo(duration: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmWaterPrimitive {
    const createDefaultProps: () => {
        show: boolean;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        height: number | undefined;
        allowPicking: boolean;
        ground: boolean;
        waterColor: ESJColor;
        frequency: number;
        waveVelocity: number;
        amplitude: number;
        specularIntensity: number;
    };
}
export interface CzmWaterPrimitive extends UniteChanged<ReturnType<typeof CzmWaterPrimitive.createDefaultProps>> {
}
