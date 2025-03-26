import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
/**
 * 坐标架
 */
export declare class GeoCoordinates extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
        heading: number;
        dimensions: [number, number, number];
        xAxisColor: [number, number, number, number];
        yAxisColor: [number, number, number, number];
        zAxisColor: [number, number, number, number];
    };
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCoordinates {
    const createDefaultProps: () => {
        show: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        heading: number;
        dimensions: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        xAxisColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        yAxisColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        zAxisColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
    };
}
export interface GeoCoordinates extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCoordinates.createDefaultProps>> {
}
