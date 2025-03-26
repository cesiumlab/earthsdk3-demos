import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmRectangleGroundPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    static defaults: {
        material: CzmMaterialJsonType;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmRectangleGroundPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType | undefined>;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        rotation: number | undefined;
        stRotation: number | undefined;
    };
}
export interface CzmRectangleGroundPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmRectangleGroundPrimitive.createDefaultProps>> {
}
