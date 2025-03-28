import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { MultiPointsModifyEditing } from ".";
export declare class VisibilityModifyEditing extends MultiPointsModifyEditing {
    constructor(czmViewer: ESCesiumViewer);
    createPolyline(czmViewer: ESCesiumViewer): void;
}
export declare namespace VisibilityModifyEditing {
    const createDefaultProps: () => {
        visibilityPositions: import("xbsj-base").ReactiveVariable<[number, number, number][][] | undefined>;
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
export interface VisibilityModifyEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof VisibilityModifyEditing.createDefaultProps>> {
}
