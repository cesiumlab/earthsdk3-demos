import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESJVector3D } from "earthsdk3";
import { Editing } from "../Editing";
export declare class PointEditing extends Editing {
    static defaults: {
        position: [number, number, number];
        enabled: boolean;
    };
    constructor();
}
export declare namespace PointEditing {
    const createDefaultProps: () => {
        position: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        enabled: boolean;
    };
}
export interface PointEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof PointEditing.createDefaultProps>> {
}
