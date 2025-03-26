import { ESLocationMeasurement } from "earthsdk3";
import { CzmESEditing, CzmESObjectWithLocation, GeoCustomDivPoi } from "../../base";
import { ESCesiumViewer } from "./../../../ESCesiumViewer";
export type GeoLocationMeasurementTextFuncType = (position: [number, number, number]) => string;
export declare class CzmESLocationMeasurement extends CzmESObjectWithLocation<ESLocationMeasurement> {
    static readonly type: void;
    private _geoCustomDivPoi;
    get geoCustomDivPoi(): GeoCustomDivPoi<{
        destroy(): undefined;
    }>;
    private _sEditing;
    get sEditing(): CzmESEditing;
    static defaultTextFunc_度格式: (position: [number, number, number]) => string;
    static defaultTextFunc_度分格式: (position: [number, number, number]) => string;
    static defaultTextFunc_度分秒格式: (position: [number, number, number]) => string;
    private _textFunc;
    get textFunc(): GeoLocationMeasurementTextFuncType | undefined;
    set textFunc(value: GeoLocationMeasurementTextFuncType | undefined);
    get textFuncChanged(): import("xbsj-base").Listener<[GeoLocationMeasurementTextFuncType | undefined, GeoLocationMeasurementTextFuncType | undefined]>;
    constructor(sceneObject: ESLocationMeasurement, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
