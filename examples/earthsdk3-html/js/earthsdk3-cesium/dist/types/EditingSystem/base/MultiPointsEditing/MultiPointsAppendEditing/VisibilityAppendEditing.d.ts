import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { MultiPointsAppendEditing } from ".";
import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class VisibilityAppendEditing extends MultiPointsAppendEditing {
    constructor(czmViewer: ESCesiumViewer);
    createPolyline(czmViewer: ESCesiumViewer): void;
}
export declare namespace VisibilityAppendEditing {
    const createDefaultProps: () => {
        visibilityPositions: import("xbsj-base").ReactiveVariable<[number, number, number][][] | undefined>;
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
export interface VisibilityAppendEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof VisibilityAppendEditing.createDefaultProps>> {
}
