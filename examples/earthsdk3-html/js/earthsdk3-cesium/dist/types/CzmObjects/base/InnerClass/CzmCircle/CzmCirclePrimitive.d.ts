import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmCirclePrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        show: boolean;
        allowPicking: boolean;
        translucent: boolean;
        outlineColor: [number, number, number, number];
        position: [number, number, number];
        height: number;
        extrudedHeight: number;
        radius: number;
        stRotation: number;
        ellipsoid: [number, number, number];
        granularity: number;
    };
}
export declare namespace CzmCirclePrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        radius: number | undefined;
        stRotation: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number | undefined;
    };
}
export interface CzmCirclePrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCirclePrimitive.createDefaultProps>> {
}
