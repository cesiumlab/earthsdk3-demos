import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType, PolygonHierarchyType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolygonGroundPrimitiveWithHeight extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolygonGroundPrimitiveWithHeight {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        arcType: "GEODESIC" | "NONE" | "RHUMB";
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        stRotation: number;
        polygonHierarchy: import("xbsj-base").ReactiveVariable<PolygonHierarchyType>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number;
        perPositionHeight: boolean;
        closeTop: boolean;
        closeBottom: boolean;
    };
}
export interface CzmPolygonGroundPrimitiveWithHeight extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonGroundPrimitiveWithHeight.createDefaultProps>> {
}
