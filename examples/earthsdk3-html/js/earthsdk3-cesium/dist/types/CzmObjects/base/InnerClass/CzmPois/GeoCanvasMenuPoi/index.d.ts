import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
export declare class GeoCanvasMenuPoi extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _commandEvent;
    get commandEvent(): Event<[commandName: string, pointerEvent: PointerEvent]>;
    private _dbclickEvent;
    get dbclickEvent(): Event<[pointerEvent: PointerEvent]>;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCanvasMenuPoi {
    const createDefaultProps: () => {
        show: boolean;
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        title: string;
        description: string;
        imageUri: string;
        commands: import("xbsj-base").ReactiveVariable<[name: string, title: string, description: string, imageUrl: string][] | undefined>;
        clickCommandName: string;
        rightClickCommandName: string;
        mainPoiSize: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        mainPoiBgColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        mainPoiFgColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
    };
}
export interface GeoCanvasMenuPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCanvasMenuPoi.createDefaultProps>> {
}
