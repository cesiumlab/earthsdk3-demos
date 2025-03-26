import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmCircleOutlinePrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        show: boolean;
        translucent: boolean;
        allowPicking: boolean;
        outlineColor: [number, number, number, number];
        position: [number, number, number];
        height: number;
        extrudedHeight: number;
        radius: number;
        ellipsoid: [number, number, number];
        granularity: number;
        numberOfVerticalLines: number;
    };
}
export declare namespace CzmCircleOutlinePrimitive {
    const createDefaultProps: () => {
        show: boolean;
        translucent: boolean | undefined;
        allowPicking: boolean | undefined;
        outlineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        radius: number | undefined;
        ellipsoid: [x: number, y: number, z: number] | undefined;
        granularity: number | undefined;
        numberOfVerticalLines: number | undefined;
    };
}
export interface CzmCircleOutlinePrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmCircleOutlinePrimitive.createDefaultProps>> {
}
