import { SceneObjectKey, UniteChanged } from "xbsj-base";
import { ESSceneObject } from "../base";
export declare class ESViewerStatusBarScale extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        show: boolean;
        height: number;
        fontSize: number;
        bgColor: [number, number, number, number];
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    static defaults: {
        show: boolean;
        height: number;
        fontSize: number;
        bgColor: [number, number, number, number];
    };
    constructor(id?: SceneObjectKey);
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESViewerStatusBarScale {
    const createDefaultProps: () => {
        show: boolean;
        height: number;
        fontSize: number;
        bgColor: [number, number, number, number];
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESViewerStatusBarScale extends UniteChanged<ReturnType<typeof ESViewerStatusBarScale.createDefaultProps>> {
}
