import { PickedInfo } from "earthsdk3";
import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
import { CzmViewDistanceRangeControl } from "../../../../../utils";
import { CanvasPoi, CanvasPrimitivesContext, Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmCanvasPoi, CzmPoisContext } from "../CzmPoisImpl";
import * as Cesium from 'cesium';
export type CanvasPoiClassAndCreateFuncPairType = [canvasPoiClass: new (canvasPrimitivesContext: CanvasPrimitivesContext) => CanvasPoi, createFunc: (canvasPoi: CanvasPoi, visibleAlphaChanged?: Listener<[number, number]>) => Destroyable];
/**
 * 该类是GeoCanvasPointPoi、GeoCanvasImagePoi等场景对象的基础类，不要直接使用！
 */
export declare class GeoCanvasPoi extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _clickEvent;
    get clickEvent(): Event<[PointerEvent]>;
    private _clickOutEvent;
    get clickOutEvent(): Event<[PointerEvent]>;
    private _dblclickEvent;
    get dblclickEvent(): Event<[PointerEvent]>;
    private _dblclickOutEvent;
    get dblclickOutEvent(): Event<[PointerEvent]>;
    private _canvasPoiClassAndCreateFunc;
    get canvasPoiClassAndCreateFunc(): CanvasPoiClassAndCreateFuncPairType | undefined;
    set canvasPoiClassAndCreateFunc(value: CanvasPoiClassAndCreateFuncPairType | undefined);
    get canvasPoiClassAndCreateFuncChanged(): Listener<[CanvasPoiClassAndCreateFuncPairType | undefined, CanvasPoiClassAndCreateFuncPairType | undefined]>;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewerVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _canvasObj?;
    get canvasObj(): CanvasPoiCreating | undefined;
    static defaults: {
        viewDistanceRange: [number, number, number, number];
    };
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoCanvasPoi {
    const createDefaultProps: () => {
        show: boolean;
        enabled: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        zOrder: number;
    };
}
export interface GeoCanvasPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCanvasPoi.createDefaultProps>> {
}
declare class CanvasPoiCreating extends Destroyable {
    czmCanvasPoi: CzmCanvasPoi<CanvasPoi>;
    constructor(sceneObject: GeoCanvasPoi, canvasPoiClass: new (canvasPrimitivesContext: CanvasPrimitivesContext) => CanvasPoi, poiContext: CzmPoisContext, viewer: Cesium.Viewer, createFunc: (canvasPoi: CanvasPoi, visibleAlphaChanged?: Listener<[number, number]>) => Destroyable);
}
export {};
