import { Event, UniteChanged } from "xbsj-base";
import { ESJVector3D } from "../../../ESJTypes";
import { ESVisualObject } from "../../base";
import { addTreesCallFunc, cutDownTreesCallFunc, growthSimulationCallFunc, removeAllTreesCallFunc, updateTreeParamsCallFunc } from "./CallFunc";
export type ESTreeTypeSep = {
    name: string;
    meshPath: string;
};
export type ESTreeParam = {
    id: string;
    treeTypeId: number;
    location: ESJVector3D;
    scale: ESJVector3D;
};
export type ToScaleType = {
    [key: string]: [ESJVector3D, ESJVector3D, ESJVector3D, number];
};
export type ToCutDownScaleType = {
    [key: string]: [ESJVector3D, number];
};
export { addTreesCallFunc, removeAllTreesCallFunc, updateTreeParamsCallFunc, cutDownTreesCallFunc, growthSimulationCallFunc };
export declare class ESSeparateFoliage extends ESVisualObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        treeTypes: import("xbsj-base").ReactiveVariable<ESTreeTypeSep[] | undefined>;
        stumpId: number;
        intervalTime: number;
        switchIntervalTime: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    addTreesCallFunc(ueViewer: any, trees: ESTreeParam[]): Promise<{
        error: string | undefined;
    } | undefined>;
    updateTreeParamsCallFunc(ueViewer: any, trees: ESTreeParam[]): Promise<{
        error: string | undefined;
    } | undefined>;
    cutDownTreesCallFunc(ueViewer: any, TreeIds: ToCutDownScaleType[], TimeLength: number): Promise<{
        error: string | undefined;
    } | undefined>;
    removeAllTreesCallFunc(ueViewer: any): Promise<{
        error: string | undefined;
    } | undefined>;
    growthSimulationCallFunc(ueViewer: any, ToParams: ToScaleType[], TimeLength: number, SwitchTime: number): Promise<{
        error: string | undefined;
    } | undefined>;
    getIdByComponentNameAndHitItem(viewer: any, ComponentName: string, HitItem: number): Promise<any>;
    private _addTreesEvent;
    get addTreesEvent(): Event<[TreeParams: ESTreeParam[]]>;
    addTrees(TreeParams: ESTreeParam[]): void;
    private _removeAllTreesEvent;
    get removeAllTreesEvent(): Event<[]>;
    removeAllTrees(): void;
    private _updateTreeParamsEvent;
    get updateTreeParamsEvent(): Event<[TreeParams: ESTreeParam[]]>;
    updateTreeParams(TreeParams: ESTreeParam[]): void;
    private _cutDownTreesEvent;
    get cutDownTreesEvent(): Event<[TreeId: ToCutDownScaleType[], TimeLength: number]>;
    cutDownTrees(TreeId: ToCutDownScaleType[], TimeLength: number): void;
    private _growthSimulationEvent;
    get growthSimulationEvent(): Event<[ToParams: ToScaleType[], TimeLength: number, SwitchTime: number]>;
    growthSimulation(ToParams: ToScaleType[], TimeLength: number, SwitchTime: number): void;
    static defaults: {
        treeTypes: ESTreeTypeSep[];
        stumpId: number;
        intervalTime: number;
        switchIntervalTime: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: string);
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESSeparateFoliage {
    const createDefaultProps: () => {
        treeTypes: import("xbsj-base").ReactiveVariable<ESTreeTypeSep[] | undefined>;
        stumpId: number;
        intervalTime: number;
        switchIntervalTime: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESSeparateFoliage extends UniteChanged<ReturnType<typeof ESSeparateFoliage.createDefaultProps>> {
}
