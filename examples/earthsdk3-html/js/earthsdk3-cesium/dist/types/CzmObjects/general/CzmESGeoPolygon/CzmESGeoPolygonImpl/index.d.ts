import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { PointEditing, PositionsCenter, PositionsEditing } from "../../../../CzmObjects";
export declare class CzmESGeoPolygonImpl extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _sPointEditing;
    get sPointEditing(): PointEditing;
    private _positionsCenter;
    get positionsCenter(): PositionsCenter;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        viewDistanceRange: [number, number, number, number];
        positions: never[];
    };
}
export declare namespace CzmESGeoPolygonImpl {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        outline: boolean;
        strokeGround: boolean;
        ground: boolean;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        outlineWidth: number;
        fill: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        editing: boolean;
        pointEditing: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        viewDistanceRange: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        viewDistanceDebug: boolean;
        depthTest: boolean;
    };
}
export interface CzmESGeoPolygonImpl extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmESGeoPolygonImpl.createDefaultProps>> {
}
