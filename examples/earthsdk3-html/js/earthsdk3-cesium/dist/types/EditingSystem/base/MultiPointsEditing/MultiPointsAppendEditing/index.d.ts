import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { MultiPointsEditing } from "..";
import { Event, ReactivePropsToNativePropsAndChanged, Destroyable } from "xbsj-base";
import { PlaceEditing } from "../../../../EditingSystem/base/PlaceEditing";
import { ESJVector3DArray } from "earthsdk3";
export declare class MultiPointsAppendEditing extends MultiPointsEditing {
    private _deletePreviousPointWhileAddingEvent;
    deletePreviousPointWhileAdding(): void;
    placeEditing: PlaceEditing;
    resetPositions(value?: ESJVector3DArray): boolean;
    constructor(czmViewer: ESCesiumViewer);
    private _addingEditingProcessing;
}
export declare namespace MultiPointsAppendEditing {
    const createDefaultProps: () => {
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
export interface MultiPointsAppendEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof MultiPointsAppendEditing.createDefaultProps>> {
}
export declare class PointAdding extends Destroyable {
    private _overEvent;
    get overEvent(): Event<[boolean]>;
    constructor(multiPointsAppendEditing: MultiPointsAppendEditing, index: number);
}
export declare function deletePreviousPoint(multiPointsAppendEditing: MultiPointsAppendEditing, currentIndex: number): boolean;
export declare class PreviousPointDeleting extends Destroyable {
    private _overEvent;
    get overEvent(): Event<[boolean]>;
    private _doEvent;
    do(): void;
    constructor(multiPointsAppendEditing: MultiPointsAppendEditing, currentIndex: number);
}
