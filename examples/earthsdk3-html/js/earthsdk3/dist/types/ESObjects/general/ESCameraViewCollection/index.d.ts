import { ObservableArray, UniteChanged, UniteJson } from "xbsj-base";
import { ESJViewInfo } from "../../../ESJTypes";
import { ESSceneObject } from "../../base";
import { ViewWrapper } from "./ViewWrapper";
/**
 * https://www.wolai.com/earthsdk/eV1jsaXWLWjaetTVCeSvww
 */
export declare class ESCameraViewCollection extends ESSceneObject {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        playing: boolean;
        loop: boolean;
        intervalTime: number;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    get json(): JsonType;
    set json(value: JsonType);
    private _currentViewIndex;
    get currentViewIndex(): number;
    get currentViewIndexChanged(): import("xbsj-base").Listener<[number, number]>;
    private _viewWrappers;
    private _currentViewWrapper;
    emitViewsWarpper(): void;
    private _container;
    get container(): HTMLDivElement | undefined;
    get containerChanged(): import("xbsj-base").Listener<[HTMLDivElement | undefined, HTMLDivElement | undefined]>;
    set container(value: HTMLDivElement | undefined);
    get views(): ESJViewInfo[];
    get viewsChanged(): import("xbsj-base").Event<[target: ObservableArray<ViewWrapper>]>;
    set views(value: ESJViewInfo[]);
    /**
     * 获取当前视角的index
     * @param viewWrapper 当前选中的视角
     * @returns 选中视角的index
     */
    private _getIndex;
    /**
     * 删除所有视角
     */
    clearAllViews(): void;
    /**
     * 添加视角
     * @param name 视角名称 string | undefined ,默认 `视角${views.length+ 1}`
     * @param size 截图尺寸 [number, number]  | undefined,默认[64, 64]
     */
    add(name?: string, size?: [number, number]): void;
    /**
     * 更新视角
     * @param index 更新指定位置的视角 number
     * @param name 视角名称 string | undefined
     * @param size 截图尺寸 [number, number]  | undefined,默认[64, 64]
     */
    update(index: number, name?: string, size?: [number, number]): false | undefined;
    /**
     * 添加视角
     */
    addView(): void;
    /**
     * 插入视角
     * @param index 当前视角的index
     * @returns
     */
    insertView(index: number): void;
    /**
     * 设置当前视角
     * @param index 当前视角的index
     * @returns
     */
    setCurrentView(index: number): boolean;
    /**
     * 重置视角
     * @param index 当前视角的index
     * @returns
     */
    resetView(index: number): void;
    /**
     * 重置视角名称
     * @param index 当前视角的index
     * @returns
     */
    resetViewName(index: number, value: string): void;
    /**
     * 修改指定视角
     * @param index 当前视角的index
     * @returns
     */
    updateView(index: number, val: ESJViewInfo): false | undefined;
    /**
     * 飞入指定视角
     * @param index
     */
    flyToView(index: number): void;
    /**
     * 上一个视角
     * @returns
     */
    flyToPrevView(): boolean;
    /**
    * 当前视角移动到上一个视角
    * @returns
    */
    moveToPreView(): void;
    /**
   * 当前视角移动到下一个视角
   * @returns
   */
    moveToNextView(): void;
    /**
     * 下一个视角
     * @returns
     */
    flyToNextView(): boolean;
    /**
     * 停止
     */
    stop(): void;
    /**
     * 删除指定视角
     * @param index 要删除视角的index
     * @returns
     */
    deleteView(index: number): void;
    /**
     * 删除当前视角
     * @returns
     */
    deleteCurrentView(): void;
    /**
     * 转换图片路径
     * @param url 图片路径
     * @returns 转化以后的图片路径
     */
    transitionImageUrl(url: string): string;
    constructor(id?: string);
    static defaults: {
        loop: boolean;
        playing: boolean;
        intervalTime: number;
        duration: number;
        views: never[];
    };
    getProperties(language?: string): import("../../../ESJTypes").Property[];
}
export declare namespace ESCameraViewCollection {
    const createDefaultProps: () => {
        playing: boolean;
        loop: boolean;
        intervalTime: number;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESCameraViewCollection extends UniteChanged<ReturnType<typeof ESCameraViewCollection.createDefaultProps>> {
}
type JsonType = UniteJson<ReturnType<typeof ESCameraViewCollection.createDefaultProps> & {
    type: string;
} & {
    views: ESJViewInfo[];
}>;
export {};
