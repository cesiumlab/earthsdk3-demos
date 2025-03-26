import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmClassificationType, PolygonHierarchyType } from "../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmClassificationPolygonPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        color: [number, number, number, number];
    };
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmClassificationPolygonPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        arcType: "GEODESIC" | "NONE" | "RHUMB" | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        stRotation: number | undefined;
        polygonHierarchy: import("xbsj-base").ReactiveVariable<PolygonHierarchyType>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number | undefined;
        perPositionHeight: boolean | undefined;
        closeTop: boolean | undefined;
        closeBottom: boolean | undefined;
        classificationType: CzmClassificationType;
    };
}
export interface CzmClassificationPolygonPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmClassificationPolygonPrimitive.createDefaultProps>> {
}
