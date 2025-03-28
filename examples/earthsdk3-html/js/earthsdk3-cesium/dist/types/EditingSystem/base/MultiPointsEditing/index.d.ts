import { CursorFloatDiv, CursorInfo, Event, ObservableArray, Processing, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESJArcType, ESJVector3DArray, ESJVector4D } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { EditingPoint } from "./EditingPoint";
import { Editing } from "../Editing";
export type EditingStatusType = 'Adding' | 'Modifying' | 'Modifying_Point' | 'None';
export declare class MultiPointsEditing extends Editing {
    private _czmViewer;
    static readonly baseImageUrl = "${earthsdk3-assets-script-dir}/assets/img/";
    static defaults: {
        debug: boolean;
        polylineShow: boolean;
        polylineWidth: number;
        polylineColor: number[];
        polylineArcType: string;
        maxPointsNum: number;
        loop: boolean;
        firstControlPointImageUrl: string;
        otherControlPointImageUrl: string;
        enabled: boolean;
    };
    private _editingPoints;
    get editingPoints(): ObservableArray<EditingPoint>;
    private _cancelEvent;
    get cancelEvent(): Event<[]>;
    cancel(): void;
    private _currentProcess;
    get currentProcess(): Processing | undefined;
    set currentProcess(value: Processing | undefined);
    private _menuPoiEnabled;
    get menuPoiEnabled(): boolean;
    set menuPoiEnabled(value: boolean);
    get menuPoiEnabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _status;
    get status(): EditingStatusType;
    get statusChanged(): import("xbsj-base").Listener<[EditingStatusType, EditingStatusType]>;
    set status(value: EditingStatusType);
    /**
     * 每次调用都会创建一个新的数组，谨慎使用，避免影响性能！
     * @returns
     */
    getPositions(): ESJVector3DArray;
    resetPositions(value?: ESJVector3DArray): boolean;
    forceResetPositions(value?: ESJVector3DArray): void;
    get positions(): ESJVector3DArray;
    set positions(value: ESJVector3DArray);
    private _positionsChanged;
    get positionsChanged(): Event<[]>;
    get czmViewer(): ESCesiumViewer;
    private _cursorInfo?;
    get cursorInfo(): CursorInfo<CursorFloatDiv> | undefined;
    constructor(_czmViewer: ESCesiumViewer);
    createPolyline(czmViewer: ESCesiumViewer): void;
    private _createCursorInfo;
}
export declare namespace MultiPointsEditing {
    const createDefaultProps: () => {
        loop: boolean;
        debug: boolean;
        polylineShow: boolean;
        polylineWidth: number;
        polylineColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        polylineArcType: ESJArcType;
        maxPointsNum: number;
        firstControlPointImageUrl: string;
        otherControlPointImageUrl: string;
        hideCursorInfo: boolean;
        middlePointShow: boolean;
        enabled: boolean;
    };
}
export interface MultiPointsEditing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof MultiPointsEditing.createDefaultProps>> {
}
