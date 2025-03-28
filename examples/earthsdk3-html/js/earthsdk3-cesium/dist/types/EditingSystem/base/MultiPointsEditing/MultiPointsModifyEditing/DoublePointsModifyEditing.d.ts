import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { ESJVector3D } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { MultiPointsModifyEditing } from ".";
export declare class DoublePointsModifyEditing extends MultiPointsModifyEditing {
    init(): void;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace DoublePointsModifyEditing {
    const createDefaultProps: () => {
        startPosition: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        endPosition: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        distance: import("xbsj-base").ReactiveVariable<number>;
        moveWithFirstPosition: boolean;
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
export interface DoublePointsModifyEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof DoublePointsModifyEditing.createDefaultProps>> {
}
