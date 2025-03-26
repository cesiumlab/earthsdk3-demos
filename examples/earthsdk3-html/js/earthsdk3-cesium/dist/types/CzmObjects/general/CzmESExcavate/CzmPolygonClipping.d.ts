import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class CzmPolygonClipping extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: string);
}
export declare namespace CzmPolygonClipping {
    const createDefaultProps: () => {
        enabled: boolean;
        showHelper: boolean;
        editing: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        reverse: boolean;
        edgeColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        edgeWidth: number;
    };
}
export interface CzmPolygonClipping extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonClipping.createDefaultProps>> {
}
