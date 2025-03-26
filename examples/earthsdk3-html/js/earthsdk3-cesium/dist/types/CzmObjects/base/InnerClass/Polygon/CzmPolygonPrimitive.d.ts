import { CzmMaterialJsonType, PolygonHierarchyType } from "../../../../ESJTypesCzm";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class CzmPolygonPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        allowPicking: boolean;
        show: boolean;
        polygonHierarchy: PolygonHierarchyType;
        stRotation: number;
        material: CzmMaterialJsonType;
    };
    static polygonHierarchyMd: string;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolygonPrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        polygonHierarchy: import("xbsj-base").ReactiveVariable<PolygonHierarchyType | undefined>;
        stRotation: number | undefined;
        material: import("xbsj-base").ReactiveVariable<CzmMaterialJsonType | undefined>;
    };
}
export interface CzmPolygonPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonPrimitive.createDefaultProps>> {
}
