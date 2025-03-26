import { ESSceneObject } from "../base";
import { ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class ESNavigator extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        show: boolean;
        cssSize: number;
        cssPosition: number[];
        imgUrl: string;
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
        cssPosition: [number, number];
        cssSize: number;
        imgUrl: string;
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESNavigator {
    const createDefaultProps: () => {
        show: boolean;
        cssSize: number;
        cssPosition: number[];
        imgUrl: string;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESNavigator extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESNavigator.createDefaultProps>> {
}
