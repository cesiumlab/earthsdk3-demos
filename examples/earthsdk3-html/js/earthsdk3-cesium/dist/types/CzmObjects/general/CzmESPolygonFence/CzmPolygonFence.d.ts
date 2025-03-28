import { CzmCustomPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmPolygonFence extends Destroyable {
    static defaults: {
        show: boolean;
        allowPicking: boolean;
        editing: boolean;
        pointEditing: boolean;
        positions: [number, number, number][];
        height: number;
        textureSizeInMeters: [number, number];
        textureUri: string;
        textureMoveSpeed: [number, number];
        textureColor: [number, number, number, number];
    };
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    private _geoBoundingSphere;
    get geoBoundingSphere(): import("../../../utils").GeoBoundingSphereType | undefined;
    get geoBoundingSphereChanged(): Listener<[import("../../../utils").GeoBoundingSphereType | undefined, import("../../../utils").GeoBoundingSphereType | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmPolygonFence {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        height: number | undefined;
        textureSizeInMeters: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        textureUri: string | undefined;
        textureMoveSpeed: import("xbsj-base").ReactiveVariable<[number, number] | undefined>;
        textureColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
    };
}
export interface CzmPolygonFence extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmPolygonFence.createDefaultProps>> {
}
