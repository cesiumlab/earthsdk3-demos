import { JsonValue, Tree, UiTree } from "xbsj-base";
import { SceneTreeItem, SceneTreeItemInsertFlag, SceneTreeItemJsonValue } from "./SceneTreeItem";
import { defaultCreateSceneObject } from "./defaultCreateSceneObject";
import { getSceneObjectShow as defaultGetSceneObjectShow, setSceneObjectShow as defaultSetSceneObjectShow } from "./defaultShowSceneObject";
import { defaultCreateTreeItemDragDrop } from "./defaultCreateTreeItemDragDrop";
import { preload } from "./preload";
import { SceneTreeContextMenu } from "./SceneTreeContextMenu";
import { ESObjectsManager } from "../../ESObjectManager";
import { DragStartDataManager } from "../base";
import { ESSceneObject } from "../../ESObjects";
export type SceneTreeJsonValue = {
    root: SceneTreeItemJsonValue;
};
declare function defaultGetSceneTreeItemCloneName(originSceneTreeItem: SceneTreeItem): string;
export declare class SceneTree extends Tree<SceneTreeItem> {
    private _name;
    private _dragStartDataManager;
    private _projectManager;
    private _jsonLoading;
    get json(): SceneTreeJsonValue;
    set json(value: SceneTreeJsonValue);
    get jsonStr(): string;
    set jsonStr(value: string);
    get jsonLoadingEvent(): import("xbsj-base").Event<[{
        type: "init" | "loading" | "loaded";
    } | {
        type: "error";
        error?: string | undefined;
    }]>;
    get name(): string;
    static defaultCreateSceneObjectFunc: typeof defaultCreateSceneObject;
    createSceneObjectFunc: typeof defaultCreateSceneObject;
    static defaultCreateTreeItemDragDropFunc: typeof defaultCreateTreeItemDragDrop;
    createTreeItemDragDropFunc: typeof defaultCreateTreeItemDragDrop;
    static defaultPreload: typeof preload;
    preloadFunc: typeof preload;
    static defaultGetSceneObjectShow: typeof defaultGetSceneObjectShow;
    getSceneObjectShowFunc: typeof defaultGetSceneObjectShow;
    static defaultSetSceneObjectShow: typeof defaultSetSceneObjectShow;
    setSceneObjectShowFunc: typeof defaultSetSceneObjectShow;
    static defaultGetSceneTreeItemCloneNameFunc: typeof defaultGetSceneTreeItemCloneName;
    getSceneTreeItemCloneNameFunc: typeof defaultGetSceneTreeItemCloneName;
    debug: boolean;
    get projectManager(): ESObjectsManager;
    private _contextMenu;
    get contextMenu(): SceneTreeContextMenu;
    private _showPropUiOnSelecting;
    get showPropUiOnSelecting(): boolean;
    set showPropUiOnSelecting(value: boolean);
    get showPropUiOnSelectingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    constructor(_name: string, _dragStartDataManager: DragStartDataManager, itemDivHeight: number, _projectManager: ESObjectsManager);
    get sceneUiTree(): UiTree<SceneTreeItem, SceneTree>;
    getTreeItemFromSceneObjId(id: string): SceneTreeItem | undefined;
    get dragStartDataManager(): DragStartDataManager;
    /**
     * 获取当前树结构的Json数据
     * @returns SceneTreeItem的isExport为true的Json数据
     */
    getJson(): {
        root: {
            children: SceneTreeItemJsonValue[];
        };
    };
    setJson(value: SceneTreeJsonValue): void;
    /**
     * 监测addNewTreeItem是否可以添加项
     * @deprecated 请勿使用，未来将废弃！
     * @param currentTreeItem
     * @param flag
     * @returns
     */
    testAddNewTreeItem(currentTreeItem: SceneTreeItem | undefined, flag: SceneTreeItemInsertFlag): boolean;
    /**
     * @deprecated 请勿使用，未来将废弃！
     * @param currentTreeItem
     * @param flag
     * @param isGroup
     * @param sceneObject
     * @returns
     */
    addNewTreeItem(currentTreeItem: SceneTreeItem | undefined, flag: SceneTreeItemInsertFlag, isGroup: boolean, sceneObject?: ESSceneObject): SceneTreeItem | undefined;
    createSceneObjectTreeItem<T extends ESSceneObject>(sceneObjectType: string | (new (id?: string | undefined) => T), id?: string, currentTreeItem?: SceneTreeItem, flag?: SceneTreeItemInsertFlag): SceneTreeItem | undefined;
    /**
     * 创建一个组节点
     * @param id
     * @param currentTreeItem
     * @param flag
     * @returns
     */
    createGroupTreeItem(name?: string, id?: string, currentTreeItem?: SceneTreeItem, flag?: SceneTreeItemInsertFlag): SceneTreeItem | undefined;
    createSceneObjectTreeItemFromClass<T extends ESSceneObject>(sceneObjConstructor: new (id?: string | undefined) => T, id?: string, currentTreeItem?: SceneTreeItem, flag?: SceneTreeItemInsertFlag): SceneTreeItem | undefined;
    createSceneObjectTreeItemFromJson<T extends ESSceneObject>(sceneObjectJson: JsonValue & {
        [k: string]: any;
        type: string;
    }, currentTreeItem?: SceneTreeItem, flag?: SceneTreeItemInsertFlag): SceneTreeItem | undefined;
    /**
     * 销毁一个场景对象节点
     * @param sceneTreeItem
     */
    destroySceneObjectTreeItem(sceneTreeItem: SceneTreeItem): void;
    /**
     * 销毁用户添加的所有场景节点
     * @returns
     */
    destroyAllSceneObjectTreeItems(): void;
}
export {};
