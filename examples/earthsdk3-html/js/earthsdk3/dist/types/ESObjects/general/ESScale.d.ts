import { UniteChanged } from "xbsj-base";
import { ESJVector2D } from "../../ESJTypes";
import { ESSceneObject } from "../base";
export declare class ESScale extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        show: boolean;
        screenPosition: string;
        cssPosition: number[];
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
        screenPosition: string;
        cssPosition: ESJVector2D;
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESScale {
    const createDefaultProps: () => {
        show: boolean;
        screenPosition: string;
        cssPosition: number[];
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESScale extends UniteChanged<ReturnType<typeof ESScale.createDefaultProps>> {
}
