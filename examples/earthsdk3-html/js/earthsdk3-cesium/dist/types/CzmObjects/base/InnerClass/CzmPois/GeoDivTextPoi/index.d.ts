import { PickedInfo } from "earthsdk3";
import { GeoCustomDivPoi } from "../../../../../CzmObjects";
import { ESCesiumViewer } from ".././../../../../ESCesiumViewer";
import { Destroyable, Event, Listener, PointerClick, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
declare class MyDivBase extends Destroyable {
    protected _container: HTMLDivElement;
    constructor(_container: HTMLDivElement, geoCustomDivPoi: GeoCustomDivPoi<MyDivBase>, viewer: ESCesiumViewer);
}
export declare class GeoDivTextPoi extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    /**
     * @deprecated
     */
    private _divEvent;
    get divEvent(): Event<[boolean | undefined]>;
    private _divCreatedEvent;
    get divCreatedEvent(): Event<[HTMLDivElement]>;
    private _divToDestroyEvent;
    get divToDestroyEvent(): Event<[HTMLDivElement]>;
    private _pc;
    get pc(): PointerClick;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _customDivPoi;
    get customDivPoi(): GeoCustomDivPoi<MyDivBase>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        width: number;
        height: number;
        text: string;
        borderStyle: string;
        fontFamily: string;
        viewDistanceRange: [number, number, number, number];
        scale: [number, number];
        zOrder: number;
    };
}
export declare namespace GeoDivTextPoi {
    const createDefaultProps: () => {
        show: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        text: string | undefined;
        width: number | undefined;
        height: number | undefined;
        fontFamily: string | undefined;
        positionEditing: boolean;
        textEditing: boolean;
        textEditingInteraction: boolean;
        originRatioAndOffset: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]>;
        opacity: number;
        fontSize: number;
        textAlign: string;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        backgroundColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        padding: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        borderRadius: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        borderWidth: number;
        borderColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        borderStyle: string;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        pickOnClick: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
        scale: import("xbsj-base").ReactiveVariable<[number, number]>;
        zOrder: number;
    };
}
export interface GeoDivTextPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoDivTextPoi.createDefaultProps>> {
}
export {};
