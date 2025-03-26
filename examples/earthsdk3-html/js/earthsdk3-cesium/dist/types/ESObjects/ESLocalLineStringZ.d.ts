import { ESLocalVector } from "earthsdk3";
import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class ESLocalLineStringZ extends ESLocalVector {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        loop: boolean;
        width: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        depthTest: boolean;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        position: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
    };
    constructor(id?: SceneObjectKey);
    getProperties(language?: string): import("earthsdk3").Property[];
}
export declare namespace ESLocalLineStringZ {
    const createDefaultProps: () => {
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        loop: boolean;
        width: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        hasDash: boolean;
        gapColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        dashLength: number;
        dashPattern: number;
        hasArrow: boolean;
        depthTest: boolean;
        stroked: boolean;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJPointStyle>;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJFillStyle>;
        position: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("earthsdk3").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
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
    };
}
export interface ESLocalLineStringZ extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESLocalLineStringZ.createDefaultProps>> {
}
