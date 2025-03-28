import { CzmPolygonWithHeight } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoSmoothPolygon extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _geoPolygon;
    get geoPolygon(): CzmPolygonWithHeight;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoSmoothPolygon {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        strokeGround: boolean;
        ground: boolean;
        outline: boolean;
        filled: boolean;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        outlineWidth: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        depth: number;
    };
}
export interface GeoSmoothPolygon extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoSmoothPolygon.createDefaultProps>> {
}
