import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
/**
 * 坐标轴
 */
export declare class GeoAxis extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    get startPosition(): [number, number, number] | undefined;
    set startPosition(value: [number, number, number] | undefined);
    get startPositionChanged(): Listener<[[number, number, number][] | undefined, [number, number, number][] | undefined]>;
    get stopPosition(): [number, number, number] | undefined;
    set stopPosition(value: [number, number, number] | undefined);
    get stopPositionChanged(): Listener<[[number, number, number][] | undefined, [number, number, number][] | undefined]>;
    static defaults: {
        positions: [number, number, number][];
    };
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace GeoAxis {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        editing: boolean;
        pointEditing: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        arcType: string;
    };
}
export interface GeoAxis extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoAxis.createDefaultProps>> {
}
