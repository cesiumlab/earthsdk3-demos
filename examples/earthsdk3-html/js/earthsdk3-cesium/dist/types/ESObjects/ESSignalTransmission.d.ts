import { ESGeoVector, Player } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
/**
 * https://www.wolai.com/earthsdk/n5kP12TYpDWzVYeM5mjVcK
 */
export declare class ESSignalTransmission extends ESGeoVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        imageUrl: string | undefined;
        repeat: number;
        bidirectional: number;
        startTime: number;
        transmissionTime: number;
        arcType: string;
        brightening: boolean;
        depthTest: boolean;
        heightRatio: number;
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
    };
    private _player;
    get player(): Player;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): import("xbsj-base").Listener<[number, number]>;
    constructor(id?: SceneObjectKey);
    static defaults: {
        loop: boolean;
        currentTime: number;
        playerCurrentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        startTime: number;
        transmissionTime: number;
        color: [number, number, number, number];
        width: number;
        heightRatio: number;
        arcType: string;
        brightening: boolean;
        depthTest: boolean;
        imageUrl: string;
        repeat: number;
        bidirectional: number;
        points: import("earthsdk3").ESJVector3DArray;
        pointStyle: import("earthsdk3").ESJPointStyle;
        strokeStyle: import("earthsdk3").ESJStrokeStyle;
        fillStyle: import("earthsdk3").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("earthsdk3").ESJFlyToParam;
        flyInParam: import("earthsdk3").ESJFlyInParam;
    };
    getProperties(language?: string): import("earthsdk3").Property[];
}
export declare namespace ESSignalTransmission {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        imageUrl: string | undefined;
        repeat: number;
        bidirectional: number;
        startTime: number;
        transmissionTime: number;
        arcType: string;
        brightening: boolean;
        depthTest: boolean;
        heightRatio: number;
        loop: boolean;
        currentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
    };
}
export interface ESSignalTransmission extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESSignalTransmission.createDefaultProps>> {
}
