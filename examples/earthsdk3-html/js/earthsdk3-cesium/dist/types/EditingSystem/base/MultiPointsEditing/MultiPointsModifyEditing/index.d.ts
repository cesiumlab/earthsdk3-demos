import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { MultiPointsEditing } from "..";
import { ReactivePropsToNativePropsAndChanged, Event, Destroyable } from "xbsj-base";
import { ModifyEditingPoint } from "./ModifyEditingPoint";
import { ESJVector3DArray } from "earthsdk3";
import { TranslationEditing } from "../..";
export declare class MultiPointsModifyEditing extends MultiPointsEditing {
    _menuPoiCommand: Event<[editingPoint: ModifyEditingPoint, command: string]>;
    menuPoiCommand(editingPoint: ModifyEditingPoint, command: string): void;
    private _forceModifyPosEditorEvent;
    modify(posEditor: ModifyEditingPoint): void;
    resetPositions(value?: ESJVector3DArray): boolean;
    private _overEvent;
    get overEvent(): Event<[number]>;
    translationEditing: TranslationEditing;
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace MultiPointsModifyEditing {
    const createDefaultProps: () => {
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
export interface MultiPointsModifyEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof MultiPointsModifyEditing.createDefaultProps>> {
}
export declare class ModifyingEditingProcessing extends Destroyable {
    private _overEvent;
    get overEvent(): Event<[number]>;
    private _cancelEvent;
    cancel(): void;
    private _forceModifyPosEditorEvent;
    modify(posEditor: ModifyEditingPoint): void;
    constructor(multiPointsModifyEditing: MultiPointsModifyEditing);
}
export declare class PointModifying extends Destroyable {
    private _modifying;
    private _posEditor;
    private _overEvent;
    get overEvent(): Event<[]>;
    constructor(_modifying: MultiPointsModifyEditing, _posEditor: ModifyEditingPoint);
}
