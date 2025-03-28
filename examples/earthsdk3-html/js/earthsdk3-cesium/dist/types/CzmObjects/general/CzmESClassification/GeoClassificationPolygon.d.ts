import { CzmPolygonWithHeight } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export type GeoClassificationType = 'TERRAIN' | 'CESIUM_3D_TILE' | 'BOTH';
export declare class GeoClassificationPolygon extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _helperPolygon;
    get helperPolygon(): CzmPolygonWithHeight;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
    };
}
export declare namespace GeoClassificationPolygon {
    const createDefaultProps: () => {
        show: boolean;
        showHelper: boolean;
        allowPicking: boolean;
        classificationType: GeoClassificationType;
        outline: boolean;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        outlineWidth: number;
        fill: boolean;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        depth: number;
        zIndex: number;
    };
}
export interface GeoClassificationPolygon extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoClassificationPolygon.createDefaultProps>> {
}
