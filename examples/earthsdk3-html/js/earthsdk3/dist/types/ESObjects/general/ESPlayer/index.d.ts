import { UniteChanged } from "xbsj-base";
import { ESSceneObject } from "../../base";
import { AbsolutePlayer } from "./AbsolutePlayer";
export declare class ESPlayer extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        currentTime: number;
        startTime: number;
        stopTime: number;
        playing: boolean;
        loop: boolean;
        speed: number;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    static defaults: {
        currentTime: number;
        startTime: number;
        stopTime: number;
        playing: boolean;
        loop: boolean;
        speed: number;
    };
    private _absolutePlayer;
    get absolutePlayer(): AbsolutePlayer;
    get ratio(): number;
    get ratioChanged(): import("xbsj-base").Listener<[number, number]>;
    set ratio(value: number);
    constructor(id?: string);
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESPlayer {
    const createDefaultProps: () => {
        currentTime: number;
        startTime: number;
        stopTime: number;
        playing: boolean;
        loop: boolean;
        speed: number;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESPlayer extends UniteChanged<ReturnType<typeof ESPlayer.createDefaultProps>> {
}
