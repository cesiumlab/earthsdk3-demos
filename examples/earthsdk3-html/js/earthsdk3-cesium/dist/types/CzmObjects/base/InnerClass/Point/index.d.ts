import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { PositionEditing } from "../../../../CzmObjects";
export declare class CzmPoint extends Destroyable {
    static defaults: {
        pixelSize: number;
        outlineWidth: number;
        color: [number, number, number, number];
        outlineColor: [number, number, number, number];
    };
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing;
    private _updateObjectsToExcludeWrapper;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPoint {
    const createDefaultProps: () => {
        editing: boolean;
        show: boolean | undefined;
        allowPicking: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        pixelSize: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        distanceDisplayCondition: [number, number] | undefined;
        disableDepthTestDistance: number | undefined;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        outlineWidth: number | undefined;
        scaleByDistance: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        translucencyByDistance: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
    };
}
export interface CzmPoint extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPoint.createDefaultProps>> {
}
