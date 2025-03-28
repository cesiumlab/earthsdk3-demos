import { ESCesiumViewer } from "../../../../index";
import { ESJVector4D } from "earthsdk3";
import { Destroyable, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoScale extends Destroyable {
    static defaults: {
        positions: [number, number, number][];
    };
    get startPosition(): [number, number, number] | undefined;
    set startPosition(value: [number, number, number] | undefined);
    get startPositionChanged(): import("xbsj-base").Listener<[[number, number, number][] | undefined, [number, number, number][] | undefined]>;
    get stopPosition(): [number, number, number] | undefined;
    set stopPosition(value: [number, number, number] | undefined);
    get stopPositionChanged(): import("xbsj-base").Listener<[[number, number, number][] | undefined, [number, number, number][] | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoScale {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<ESJVector4D>;
    };
}
export interface GeoScale extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoScale.createDefaultProps>> {
}
