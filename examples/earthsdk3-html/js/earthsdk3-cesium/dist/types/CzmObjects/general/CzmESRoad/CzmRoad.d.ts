import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmRoad extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        show: boolean;
        positions: never[];
        width: number;
        arcType: string;
        imageUrl: string;
        repeat: [number, number];
        allowPicking: boolean;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmRoad {
    const createDefaultProps: () => {
        show: boolean | undefined;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number | undefined;
        arcType: "GEODESIC" | "NONE" | "RHUMB" | undefined;
        imageUrl: string | undefined;
        repeat: [number, number] | undefined;
        allowPicking: boolean | undefined;
    };
}
export interface CzmRoad extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmRoad.createDefaultProps>> {
}
