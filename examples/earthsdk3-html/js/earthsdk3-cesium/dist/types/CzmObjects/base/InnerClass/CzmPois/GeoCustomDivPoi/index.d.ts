import { PickedInfo } from "earthsdk3";
import { CzmDivPoi } from "../../../../../CzmObjects";
import { ESCesiumViewer } from "./../../../../../ESCesiumViewer";
import { CzmViewDistanceRangeControl } from "../../../../../utils";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, PosFloatDiv, ObjResettingWithEvent, SceneObjectKey } from "xbsj-base";
export type GeoCustomDivPoiInstanceClass<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> = (new (container: HTMLDivElement, customDiv: GeoCustomDivPoi<DivClass>, viewer: ESCesiumViewer) => DivClass);
export declare class GeoCustomDivPoi<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> extends Destroyable {
    private _updateEvent;
    update(updateFunc: (divClass: DivClass, customDiv: GeoCustomDivPoi<DivClass>, viewer: ESCesiumViewer) => void): void;
    private _instanceClassReact;
    get instanceClass(): GeoCustomDivPoiInstanceClass<DivClass> | undefined;
    set instanceClass(value: GeoCustomDivPoiInstanceClass<DivClass> | undefined);
    get instanceClassChanged(): Listener<[GeoCustomDivPoiInstanceClass<DivClass> | undefined, GeoCustomDivPoiInstanceClass<DivClass> | undefined]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    pickFromDiv(element: HTMLElement, childPickedInfo?: PickedInfo): void;
    private _innerHtmlMounted;
    get innerHtmlMounted(): Listener<[contentDiv: HTMLDivElement, viewer: ESCesiumViewer]>;
    static defaulInstanceClassStr: string;
    static instanceClassStrReadMe: string;
    private _czmDivPoi?;
    get czmDivPoi(): CzmDivPoi<PosFloatDiv> | undefined;
    set czmDivPoi(v: CzmDivPoi<PosFloatDiv> | undefined);
    private _objResetting;
    get objResetting(): ObjResettingWithEvent<DivClass, Listener<any[]>> | undefined;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewerVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    static defaults: {
        position: [number, number, number];
        instanceClassStr: string;
        instanceClassStrReadMe: string;
        innerHTML: string;
        innerHTMLReadMe: string;
        viewDistanceRange: [number, number, number, number];
        zOrder: number;
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoCustomDivPoi {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        opacity: number;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        editing: boolean;
        originRatioAndOffset: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]>;
        instanceClassStr: string | undefined;
        innerHTML: string | undefined;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
        zOrder: number;
    };
}
export interface GeoCustomDivPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCustomDivPoi.createDefaultProps>> {
}
