import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { MultiPointsAppendEditing } from ".";
import { ESJVector3D } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class DoublePointsAppendEditing extends MultiPointsAppendEditing {
    init(): void;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace DoublePointsAppendEditing {
    const createDefaultProps: () => {
        startPosition: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        endPosition: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        distance: import("xbsj-base").ReactiveVariable<number>;
        loop: boolean;
        debug: boolean;
        polylineShow: boolean;
        polylineWidth: number;
        polylineColor: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector4D>;
        polylineArcType: import("earthsdk3").ESJArcType;
        maxPointsNum: number;
        firstControlPointImageUrl: string;
        otherControlPointImageUrl: string;
        hideCursorInfo: boolean;
        middlePointShow: boolean;
        enabled: boolean;
    };
}
export interface DoublePointsAppendEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof DoublePointsAppendEditing.createDefaultProps>> {
}
