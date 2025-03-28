import { PickedInfo } from "earthsdk3";
import { GeoCanvasPoi } from "../../../../../CzmObjects";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class GeoCanvasImagePoi extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _clickEvent;
    get clickEvent(): Event<[PointerEvent]>;
    private _clickOutEvent;
    get clickOutEvent(): Event<[PointerEvent]>;
    private _dbclickEvent;
    get dbclickEvent(): Event<[PointerEvent]>;
    private _dbclickOutEvent;
    get dbclickOutEvent(): Event<[PointerEvent]>;
    private _clickFunc;
    get clickFunc(): ((event: PointerEvent) => void) | undefined;
    set clickFunc(value: ((event: PointerEvent) => void) | undefined);
    get clickFuncChanged(): Listener<[((event: PointerEvent) => void) | undefined, ((event: PointerEvent) => void) | undefined]>;
    private _clickFuncInit;
    static defaults: {
        viewDistanceRange: [number, number, number, number];
        scale: number[];
    };
    private _geoCanvasPoi;
    get geoCanvasPoi(): GeoCanvasPoi;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCanvasImagePoi {
    const createDefaultProps: () => {
        show: boolean;
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        fgColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        bgColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        tooltip: string;
        tooltipShow: boolean;
        title: string;
        size: import("xbsj-base").ReactiveVariable<[width: number, height: number]>;
        scale: import("xbsj-base").ReactiveVariable<[number, number]>;
        originRatioAndOffset: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]>;
        hovered: boolean;
        imageUri: string;
        opacity: number;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        pickOnClick: boolean;
        clickFuncStr: string;
        zOrder: number;
    };
}
export interface GeoCanvasImagePoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCanvasImagePoi.createDefaultProps>> {
}
