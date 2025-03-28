import { ESJNativeNumber16 } from "earthsdk3";
import { CzmPolylinesPrimitive } from '../../../CzmObjects';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { CzmClippingPlaneCollectionJsonType } from '../../../ESJTypesCzm';
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from 'xbsj-base';
export declare class CzmBoxClippingPlanes extends Destroyable {
    private _id;
    get id(): string;
    set id(value: string);
    get idChanged(): Listener<[string, string]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    static defaults: {
        position: [number, number, number];
    };
    private _computedClippingPlanes;
    get computedClippingPlanes(): CzmClippingPlaneCollectionJsonType | undefined;
    set computedClippingPlanes(value: CzmClippingPlaneCollectionJsonType | undefined);
    get computedClippingPlanesChanged(): Listener<[CzmClippingPlaneCollectionJsonType | undefined, CzmClippingPlaneCollectionJsonType | undefined]>;
    private _polylines;
    get polylines(): CzmPolylinesPrimitive;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmBoxClippingPlanes {
    const createDefaultProps: () => {
        enabled: boolean;
        showHelper: boolean;
        applyOnTerrain: boolean;
        positionEditing: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        modelMatrix: import("xbsj-base").ReactiveVariable<ESJNativeNumber16>;
        reverse: boolean;
        edgeColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        edgeWidth: number;
        minSize: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        maxSize: import("xbsj-base").ReactiveVariable<[number, number, number]>;
    };
}
export interface CzmBoxClippingPlanes extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmBoxClippingPlanes.createDefaultProps>> {
}
