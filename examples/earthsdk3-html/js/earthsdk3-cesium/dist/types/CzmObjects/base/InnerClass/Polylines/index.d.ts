import { ESJArcType } from "earthsdk3";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export * from './CzmPolylinesGroundPrimitive';
export * from './CzmPolylinesPrimitive';
export declare class CzmPolylines extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolylines {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][][] | undefined>;
        width: number;
        ground: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: ESJArcType;
        depthTest: boolean;
        topOrBottom: "none" | "top" | "bottom";
        loop: boolean;
    };
}
export interface CzmPolylines extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolylines.createDefaultProps>> {
}
