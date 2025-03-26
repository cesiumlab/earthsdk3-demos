import * as Cesium from 'cesium';
import { ESJVector3D } from "earthsdk3";
import { Destroyable, Event, SceneObjectKey, UniteChanged } from "xbsj-base";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmPointPrimitiveType } from "../../../../ESJTypesCzm";
import { NativeNumber16Type } from "../../../../utils";
export declare class CzmPointPrimitiveCollection extends Destroyable {
    pointPrimitives?: Cesium.PointPrimitiveCollection;
    private _flyToEvent;
    get flyToEvent(): Event<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPointPrimitiveCollection {
    const createDefaultProps: () => {
        show: boolean | undefined;
        debugShowBoundingVolume: boolean | undefined;
        blendOption: "OPAQUE" | "TRANSLUCENT" | "OPAQUE_AND_TRANSLUCENT" | undefined;
        pointPrimitiveOptions: CzmPointPrimitiveType[] | undefined;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        localPosition: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        localRotation: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        localScale: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        localModelMatrix: import("xbsj-base").ReactiveVariable<NativeNumber16Type | undefined>;
        modelMatrix: import("xbsj-base").ReactiveVariable<NativeNumber16Type | undefined>;
    };
}
export interface CzmPointPrimitiveCollection extends UniteChanged<ReturnType<typeof CzmPointPrimitiveCollection.createDefaultProps>> {
}
