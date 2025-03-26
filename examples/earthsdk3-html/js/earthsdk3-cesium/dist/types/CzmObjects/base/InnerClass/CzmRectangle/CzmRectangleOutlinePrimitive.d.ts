import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class CzmRectangleOutlinePrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _primitive?;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
}
export declare namespace CzmRectangleOutlinePrimitive {
    const createDefaultProps: () => {
        show: boolean | undefined;
        allowPicking: boolean | undefined;
        translucent: boolean | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        height: number | undefined;
        extrudedHeight: number | undefined;
        rotation: number | undefined;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
    };
}
export interface CzmRectangleOutlinePrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmRectangleOutlinePrimitive.createDefaultProps>> {
}
