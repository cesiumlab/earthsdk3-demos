import { PointEditing, PositionsCenter, PositionsEditing } from "../../../../CzmObjects";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmArcType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ObjResettingWithEvent, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmViewDistanceRangeControl } from "../../../../utils";
export * from './CzmPolylinePrimitive';
export * from './CzmPolylineGroundPrimitive';
export declare class CzmPolyline extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _sPointEditing;
    get sPointEditing(): PointEditing;
    private _positionsCenter;
    get positionsCenter(): PositionsCenter;
    private _polylineOrGroundPolylineResetting;
    get polylineOrGroundPolylineResetting(): ObjResettingWithEvent<GroundPolyline | Polyline, Listener<[boolean | undefined, boolean | undefined]>>;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
        viewDistanceRange: [number, number, number, number];
    };
}
export declare namespace CzmPolyline {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        loop: boolean;
        width: number;
        ground: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: CzmArcType;
        depthTest: boolean;
        editing: boolean;
        pointEditing: boolean;
        zIndex: number;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
    };
}
export interface CzmPolyline extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolyline.createDefaultProps>> {
}
declare class Polyline extends Destroyable {
    constructor(czmViewer: ESCesiumViewer, czmPolyline: CzmPolyline);
}
declare class GroundPolyline extends Destroyable {
    constructor(czmViewer: ESCesiumViewer, czmPolyline: CzmPolyline);
}
