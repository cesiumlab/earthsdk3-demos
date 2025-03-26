import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmMaterialJsonType, PolygonHierarchyType } from "../../../../ESJTypesCzm";
export * from './CzmPolygonPrimitive';
export * from './CzmPolygonGroundPrimitive';
export declare class CzmPolygon extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolygon {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        polygonHierarchy: import("xbsj-base").ReactiveVariable<PolygonHierarchyType | undefined>;
        stRotation: number | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        arcType: "GEODESIC" | "NONE" | "RHUMB";
        height: number | undefined;
        extrudedHeight: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number;
        perPositionHeight: boolean;
        closeTop: boolean;
        closeBottom: boolean;
        ground: boolean;
    };
}
export interface CzmPolygon extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygon.createDefaultProps>> {
}
