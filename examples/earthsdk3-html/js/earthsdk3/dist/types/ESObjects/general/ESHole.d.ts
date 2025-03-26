import { UniteChanged } from "xbsj-base";
import { ESExcavate } from "./ESExcavate";
import { ESPit } from "./ESPit";
/**
 * https://www.wolai.com/earthsdk/ixfCjq4UjUqWy7SeVHnCnt
 */
export declare class ESHole extends ESPit {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        depth: number;
        sideImage: import("xbsj-base").ReactiveVariable<import("./ESPit").ESJTexture>;
        bottomImage: import("xbsj-base").ReactiveVariable<import("./ESPit").ESJTexture>;
        opacity: number;
        interpolation: number;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        mode: string;
        targetID: string;
    };
    private _excavate;
    get excavate(): ESExcavate;
    private _pit;
    constructor(id?: string);
}
export declare namespace ESHole {
    const createDefaultProps: () => {
        depth: number;
        sideImage: import("xbsj-base").ReactiveVariable<import("./ESPit").ESJTexture>;
        bottomImage: import("xbsj-base").ReactiveVariable<import("./ESPit").ESJTexture>;
        opacity: number;
        interpolation: number;
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
        mode: string;
        targetID: string;
    };
}
export interface ESHole extends UniteChanged<ReturnType<typeof ESHole.createDefaultProps>> {
}
