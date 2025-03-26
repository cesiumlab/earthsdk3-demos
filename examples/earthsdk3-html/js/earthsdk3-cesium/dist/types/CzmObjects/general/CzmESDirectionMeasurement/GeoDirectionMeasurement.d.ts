import { PickedInfo } from "earthsdk3";
import { PositionsEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export type GeoDirectionMeasurementAngleMode = '-180~180' | '0~360';
export type GeoDirectionMeasurementTextFuncType = (heading: number) => string;
export declare class GeoDirectionMeasurement extends Destroyable {
    private _pickedEvent;
    get pickedEvent(): Event<[PickedInfo]>;
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    private _heading;
    get heading(): number;
    get headingChanged(): Listener<[number, number]>;
    static defaultTextFunc_度格式: (heading: number) => string;
    static defaultTextFunc_度分格式: (heading: number) => string;
    static defaultTextFunc_度分秒格式: (heading: number) => string;
    private _textFunc;
    get textFunc(): GeoDirectionMeasurementTextFuncType | undefined;
    set textFunc(value: GeoDirectionMeasurementTextFuncType | undefined);
    get textFuncChanged(): Listener<[GeoDirectionMeasurementTextFuncType | undefined, GeoDirectionMeasurementTextFuncType | undefined]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        positions: never[];
    };
}
export declare namespace GeoDirectionMeasurement {
    const createDefaultProps: () => {
        show: boolean;
        allowPicking: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        width: number;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        arcType: string;
        editing: boolean;
        depthTest: boolean;
        shadowDom: boolean;
        cssAllInitial: boolean;
        angleMode: GeoDirectionMeasurementAngleMode;
        strokeGround: boolean;
    };
}
export interface GeoDirectionMeasurement extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoDirectionMeasurement.createDefaultProps>> {
}
