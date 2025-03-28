import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class CzmPolylinesPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    private _boundingSphere?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolylinesPrimitive {
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
        topOrBottom: "none" | "top" | "bottom";
    };
}
export interface CzmPolylinesPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolylinesPrimitive.createDefaultProps>> {
}
