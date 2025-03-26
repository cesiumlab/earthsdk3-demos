import { Listener, UniteChanged } from "xbsj-base";
import { ESViewer } from "../../../ESViewer";
import { ESSceneObject } from "../../base";
import { DivInstanceClass } from "./instance";
export declare class ESCustomDiv<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        show: boolean;
        instanceClassStr: string | undefined;
        innerHTML: string | undefined;
        allowPicking: boolean | undefined;
        containerId: string | undefined;
        shadowDom: boolean;
        cssAllInitial: boolean;
        cssText: string;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _updateEvent;
    update(updateFunc: (divClass: DivClass, customDiv: ESCustomDiv<DivClass>, viewer: ESViewer) => void): void;
    private _instanceClassReact;
    get instanceClass(): DivInstanceClass<DivClass> | undefined;
    set instanceClass(value: DivInstanceClass<DivClass> | undefined);
    get instanceClassChanged(): Listener<[DivInstanceClass<DivClass> | undefined, DivInstanceClass<DivClass> | undefined]>;
    private _innerHtmlMounted;
    get innerHtmlMounted(): Listener<[contentDiv: HTMLDivElement, viewer: ESViewer]>;
    private _container;
    get container(): HTMLElement | undefined;
    get containerChanged(): Listener<[HTMLElement | undefined, HTMLElement | undefined]>;
    set container(value: HTMLElement | undefined);
    static defaults: {
        show: boolean;
        containerId: string;
    };
    constructor(id?: string);
    static defaultInnerHTML: string;
    static innerHTMLReadMe: string;
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESCustomDiv {
    const createDefaultProps: () => {
        show: boolean;
        instanceClassStr: string | undefined;
        innerHTML: string | undefined;
        allowPicking: boolean | undefined;
        containerId: string | undefined;
        shadowDom: boolean;
        cssAllInitial: boolean;
        cssText: string;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESCustomDiv<DivClass extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}> extends UniteChanged<ReturnType<typeof ESCustomDiv.createDefaultProps>> {
}
