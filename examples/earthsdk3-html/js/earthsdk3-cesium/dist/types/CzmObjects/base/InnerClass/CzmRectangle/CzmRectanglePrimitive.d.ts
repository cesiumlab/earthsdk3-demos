import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmRectanglePrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmRectanglePrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType | undefined>;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        rotation: number | undefined;
        stRotation: number | undefined;
    };
}
export interface CzmRectanglePrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmRectanglePrimitive.createDefaultProps>> {
}
