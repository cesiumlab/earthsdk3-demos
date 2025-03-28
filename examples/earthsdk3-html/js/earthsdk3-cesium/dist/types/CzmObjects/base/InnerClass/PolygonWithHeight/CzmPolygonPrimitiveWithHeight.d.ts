import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmMaterialJsonType, PolygonHierarchyType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolygonPrimitiveWithHeight extends Destroyable {
    private _positions;
    get positions(): [number, number, number][] | undefined;
    get positionsChanged(): Listener<[[number, number, number][] | undefined, [number, number, number][] | undefined]>;
    set positions(value: [number, number, number][] | undefined);
    static defaults: {
        positions: never[];
        editing: boolean;
    };
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolygonPrimitiveWithHeight {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        arcType: "GEODESIC" | "NONE" | "RHUMB" | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType>;
        stRotation: number | undefined;
        polygonHierarchy: import("xbsj-base").ReactiveVariable<PolygonHierarchyType>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number | undefined;
        perPositionHeight: boolean | undefined;
        closeTop: boolean | undefined;
        closeBottom: boolean | undefined;
    };
}
export interface CzmPolygonPrimitiveWithHeight extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonPrimitiveWithHeight.createDefaultProps>> {
}
