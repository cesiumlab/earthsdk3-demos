import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ObjResettingWithEvent, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { GroundPolygon } from "./GroundPolygon";
import { DepthPolygon } from "./DepthPolygon";
import { Polygon } from "./Polygon";
import { CurrentPositionsCenter, CzmViewDistanceRangeControl } from "../../../../utils";
export * from './CzmPolygonPrimitiveWithHeight';
export * from './CzmPolygonGroundPrimitiveWithHeight';
export declare class CzmPolygonWithHeight extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _polygonOrGroundPolygonResetting;
    get polygonOrGroundPolygonResetting(): ObjResettingWithEvent<GroundPolygon | Polygon | DepthPolygon, Listener<[boolean | undefined, boolean | undefined]>>;
    private _czmViewVisibleDistanceRangeControl;
    get czmViewVisibleDistanceRangeControl(): CzmViewDistanceRangeControl;
    get visibleAlpha(): number;
    get visibleAlphaChanged(): Listener<[number, number]>;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    private _positionsCenter;
    get positionsCenter(): CurrentPositionsCenter;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
        viewDistanceRange: [number, number, number, number];
    };
}
export declare namespace CzmPolygonWithHeight {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        ground: boolean;
        strokeGround: boolean;
        outline: boolean;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        outlineWidth: number;
        fill: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        editing: boolean;
        pointEditing: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        depth: number;
        zIndex: number;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        depthTest: boolean;
    };
}
export interface CzmPolygonWithHeight extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonWithHeight.createDefaultProps>> {
}
