import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmCircleGroundPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        show: boolean;
        editing: boolean;
        allowPicking: boolean;
        material: CzmMaterialJsonType;
        radius: number;
        stRotation: number;
        ellipsoid: [number, number, number];
        granularity: number;
    };
}
export declare namespace CzmCircleGroundPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType | undefined>;
        granularity: number | undefined;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        radius: number | undefined;
        stRotation: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
    };
}
export interface CzmCircleGroundPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCircleGroundPrimitive.createDefaultProps>> {
}
