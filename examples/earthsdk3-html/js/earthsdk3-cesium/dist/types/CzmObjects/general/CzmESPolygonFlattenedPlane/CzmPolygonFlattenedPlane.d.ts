import { ESGeoPolygon, ESSceneObjectWithId } from "earthsdk3";
import { CzmTexture, PointEditing, PositionsCenter, PositionsEditing } from '../../../CzmObjects';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, ObjResettingWithEvent } from 'xbsj-base';
import { GeoPolygonCanvas } from './GeoPolygonCanvas';
import { CzmFlattenedPlane } from './CzmFlattenedPlane';
declare class CzmFlattenedPlaneWithIdResetting extends Destroyable {
    private _czmPolygonFlattenedPlane;
    private _czmFlattenedPlane;
    constructor(_czmPolygonFlattenedPlane: CzmPolygonFlattenedPlane, _czmFlattenedPlane: CzmFlattenedPlane);
}
export declare class CzmPolygonFlattenedPlane extends Destroyable {
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): Listener<[string, string]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _sPointEditing;
    get sPointEditing(): PointEditing;
    private _positionsCenter;
    get positionsCenter(): PositionsCenter;
    private _czmTexture;
    get czmTexture(): CzmTexture;
    private _polygon;
    get polygon(): ESGeoPolygon;
    private _polygonCanvas;
    get polygonCanvas(): GeoPolygonCanvas;
    private _czmFlattenedPlaneWithId;
    get czmFlattenedPlaneWithId(): ESSceneObjectWithId<import("earthsdk3").ESSceneObject>;
    private _czmFlattendPlaneWithIdResetting;
    get czmFlattendPlaneWithIdResetting(): ObjResettingWithEvent<CzmFlattenedPlaneWithIdResetting, Listener<[import("earthsdk3").ESSceneObject | undefined, import("earthsdk3").ESSceneObject | undefined]>>;
    constructor(czmViewer: ESCesiumViewer, id?: string);
}
export declare namespace CzmPolygonFlattenedPlane {
    const createDefaultProps: () => {
        enabled: boolean;
        show: boolean;
        editing: boolean;
        pointEditing: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        allowPicking: boolean;
        czmFlattenedPlaneId: string;
    };
}
export interface CzmPolygonFlattenedPlane extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonFlattenedPlane.createDefaultProps>> {
}
export {};
