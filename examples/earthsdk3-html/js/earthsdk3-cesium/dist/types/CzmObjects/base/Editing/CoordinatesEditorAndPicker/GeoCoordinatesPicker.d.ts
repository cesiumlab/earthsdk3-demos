import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Event, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export type GeoCoordinatesPickerPickingFuncType = ((pointerEvent: PointerEvent) => boolean);
export declare class GeoCoordinatesPicker extends Destroyable {
    private _overEvent;
    get overEvent(): Event<[]>;
    static defaultClickFilterFunc: (pointerEvent: PointerEvent) => boolean;
    static defaultDbClickFilterFunc: (pointerEvent: PointerEvent) => boolean;
    private _clickFilterFunc;
    get clickFilterFunc(): GeoCoordinatesPickerPickingFuncType;
    set clickFilterFunc(value: GeoCoordinatesPickerPickingFuncType);
    get clickFilterFuncChanged(): import("xbsj-base").Listener<[GeoCoordinatesPickerPickingFuncType, GeoCoordinatesPickerPickingFuncType]>;
    private _dbClickFilterFunc;
    get dbClickFilterFunc(): GeoCoordinatesPickerPickingFuncType;
    set dbClickFilterFunc(value: GeoCoordinatesPickerPickingFuncType);
    get dbClickFilterFuncChanged(): import("xbsj-base").Listener<[GeoCoordinatesPickerPickingFuncType, GeoCoordinatesPickerPickingFuncType]>;
    constructor(czmViewer: ESCesiumViewer);
    private _createMainCoordinates;
    private _createPoint;
}
export declare namespace GeoCoordinatesPicker {
    const createDefaultProps: () => {
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        heading: number;
        axisPixelSize: number;
        axisSnapPixelSize: number;
        virtualHeight: number | undefined;
        showCoordinates: boolean;
        showCircle: boolean;
        showPoint: boolean;
        clickEnabled: boolean;
        dbClickEnabled: boolean;
    };
}
export interface GeoCoordinatesPicker extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCoordinatesPicker.createDefaultProps>> {
}
