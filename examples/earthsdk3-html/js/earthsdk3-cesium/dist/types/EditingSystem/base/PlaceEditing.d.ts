import { ESCesiumViewer } from "../../ESCesiumViewer";
import { Editing } from "./Editing";
import { Event, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESJVector3D } from "earthsdk3";
export type GeoCoordinatesPickerPickingFuncType = ((pointerEvent: PointerEvent) => boolean);
export declare class PlaceEditing extends Editing {
    static defaultConfig: {
        clickEnabled?: boolean | undefined;
        dblClickEnabled?: boolean | undefined;
    };
    private _config;
    get config(): {
        clickEnabled?: boolean | undefined;
        dblClickEnabled?: boolean | undefined;
    };
    set config(value: {
        clickEnabled?: boolean | undefined;
        dblClickEnabled?: boolean | undefined;
    });
    get configChanged(): import("xbsj-base").Listener<[{
        clickEnabled?: boolean | undefined;
        dblClickEnabled?: boolean | undefined;
    }, {
        clickEnabled?: boolean | undefined;
        dblClickEnabled?: boolean | undefined;
    }]>;
    private _overEvent;
    get overEvent(): Event<[]>;
    over(): void;
    static defaultPointerEventFilterFunc: (pointerEvent: PointerEvent) => boolean;
    static defaults: {
        position: [number, number, number];
        enabled: boolean;
    };
    private _pointerEventFilterFunc;
    get pointerEventFilterFunc(): GeoCoordinatesPickerPickingFuncType;
    set pointerEventFilterFunc(value: GeoCoordinatesPickerPickingFuncType);
    get pointerEventFilterFuncChanged(): import("xbsj-base").Listener<[GeoCoordinatesPickerPickingFuncType, GeoCoordinatesPickerPickingFuncType]>;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace PlaceEditing {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        virtualHeight: number | undefined;
        clickEnabled: boolean;
        dblClickEnabled: boolean;
        enabled: boolean;
    };
}
export interface PlaceEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof PlaceEditing.createDefaultProps>> {
}
