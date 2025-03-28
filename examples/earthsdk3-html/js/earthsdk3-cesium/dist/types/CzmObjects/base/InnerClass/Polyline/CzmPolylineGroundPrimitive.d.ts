import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmArcType, CzmMaterialJsonType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolylineGroundPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolylineGroundPrimitive {
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
export interface CzmPolylineGroundPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolylineGroundPrimitive.createDefaultProps>> {
}
