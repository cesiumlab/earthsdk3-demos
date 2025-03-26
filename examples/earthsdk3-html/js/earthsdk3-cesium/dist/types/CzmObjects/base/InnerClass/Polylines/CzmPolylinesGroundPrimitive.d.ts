import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolylinesGroundPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _groundPrimitive?;
    private _boundingSphere?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolylinesGroundPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][][] | undefined>;
        width: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        hasDash: boolean | undefined;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        dashLength: number | undefined;
        dashPattern: number | undefined;
        hasArrow: boolean | undefined;
        arcType: "GEODESIC" | "NONE" | "RHUMB" | undefined;
        depthTest: boolean | undefined;
    };
}
export interface CzmPolylinesGroundPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolylinesGroundPrimitive.createDefaultProps>> {
}
