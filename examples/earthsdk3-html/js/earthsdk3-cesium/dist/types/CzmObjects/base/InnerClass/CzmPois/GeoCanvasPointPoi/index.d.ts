import { PickedInfo } from "earthsdk3";
import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { GeoCanvasPoi } from "../GeoCanvasPoi";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
export declare class GeoCanvasPointPoi extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    static defaults: {
        viewDistanceRange: [number, number, number, number];
    };
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _clickEvent;
    get clickEvent(): Event<[PointerEvent]>;
    private _dbclickEvent;
    get dbclickEvent(): Event<[PointerEvent]>;
    private _geoCanvasPoi;
    get geoCanvasPoi(): GeoCanvasPoi;
    get sPositionEditing(): import("../../..").PositionEditing | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoCanvasPointPoi {
    const createDefaultProps: () => {
        show: boolean;
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        radius: number;
        text: string;
        font: string;
        fontColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        selectedColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hovered: boolean;
        selected: boolean;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        pickOnClick: boolean;
    };
}
export interface GeoCanvasPointPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCanvasPointPoi.createDefaultProps>> {
}
