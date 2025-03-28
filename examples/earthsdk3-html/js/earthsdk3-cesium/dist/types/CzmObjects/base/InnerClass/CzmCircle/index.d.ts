import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
export * from './CzmCircleGroundPrimitive';
export * from './CzmCircleOutlinePrimitive';
export * from './CzmCirclePrimitive';
export declare class CzmCircle extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        extrudedHeight: undefined;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmCircle {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        ground: boolean;
        outline: boolean;
        outlineTranslucent: boolean;
        extrudedHeight: number | undefined;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        radius: number;
        stRotation: number;
        ellipsoid: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        granularity: number;
        numberOfVerticalLines: number;
    };
}
export interface CzmCircle extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCircle.createDefaultProps>> {
}
