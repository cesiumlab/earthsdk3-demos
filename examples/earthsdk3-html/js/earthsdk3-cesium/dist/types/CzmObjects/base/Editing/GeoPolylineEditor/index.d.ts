import { Destroyable, Event, Listener, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { GeoPolylineEditorImpl } from "./GeoPolylineEditorImpl";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { CzmArcType } from "../../../../ESJTypesCzm";
export declare class GeoPolylineEditor extends Destroyable {
    private _czmViewer;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _inner;
    get inner(): GeoPolylineEditorImpl;
    /**
     * 每次调用都会创建一个新的数组，谨慎使用，避免影响性能！
     * @returns
     */
    getPositions(): [number, number, number][];
    resetPositions(value?: [number, number, number][]): void;
    forceResetPositions(value?: [number, number, number][]): void;
    get positions(): [number, number, number][];
    get positionsChanged(): Event<[]>;
    get czmViewer(): ESCesiumViewer;
    constructor(_czmViewer: ESCesiumViewer);
}
export declare namespace GeoPolylineEditor {
    const createDefaultProps: () => {
        enabled: boolean;
        loop: boolean;
        debug: boolean;
        polylineShow: boolean;
        polylineWidth: number;
        polylineColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        polylineArcType: CzmArcType;
        maxPointsNum: number;
        firstControlPointImageUrl: string;
        otherControlPointImageUrl: string;
        middlePointImageUrl: string;
        noModifingAfterAdding: boolean;
        hideCursorInfo: boolean;
        moveWithFirstPosition: boolean;
    };
}
export interface GeoPolylineEditor extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoPolylineEditor.createDefaultProps>> {
}
