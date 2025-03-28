import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmMaterialJsonType } from "../../../../ESJTypesCzm";
export declare class CzmRectangle extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        material: CzmMaterialJsonType;
        rectangle: undefined;
        extrudedHeight: undefined;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmRectangle {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        strokeGround: boolean;
        ground: boolean;
        outlineTranslucent: boolean;
        outline: boolean;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        height: number;
        extrudedHeight: number | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType | undefined>;
        rectangle: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        rotation: number;
        stRotation: number;
    };
}
export interface CzmRectangle extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmRectangle.createDefaultProps>> {
}
