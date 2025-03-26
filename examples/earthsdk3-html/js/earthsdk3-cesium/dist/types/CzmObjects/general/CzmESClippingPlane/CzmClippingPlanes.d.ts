import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmClippingPlaneCollectionJsonType } from "../../../ESJTypesCzm";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmClippingPlanes extends Destroyable {
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _computedClippingPlanes;
    get computedClippingPlanes(): CzmClippingPlaneCollectionJsonType | undefined;
    set computedClippingPlanes(value: CzmClippingPlaneCollectionJsonType | undefined);
    get computedClippingPlanesChanged(): Listener<[CzmClippingPlaneCollectionJsonType | undefined, CzmClippingPlaneCollectionJsonType | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmClippingPlanes {
    const createDefaultProps: () => {
        enabled: boolean;
        planeIds: import("xbsj-base").ReactiveVariable<string[]>;
        reverseNormal: boolean;
        unionClippingRegions: boolean;
        edgeColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        edgeWidth: number;
    };
}
export interface CzmClippingPlanes extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmClippingPlanes.createDefaultProps>> {
}
