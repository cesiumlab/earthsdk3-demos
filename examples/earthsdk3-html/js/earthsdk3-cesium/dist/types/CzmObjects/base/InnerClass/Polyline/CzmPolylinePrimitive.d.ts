import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmArcType, CzmMaterialJsonType } from "./../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolylinePrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolylinePrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number | undefined;
        arcType: CzmArcType | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        depthTest: boolean | undefined;
    };
}
export interface CzmPolylinePrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolylinePrimitive.createDefaultProps>> {
}
