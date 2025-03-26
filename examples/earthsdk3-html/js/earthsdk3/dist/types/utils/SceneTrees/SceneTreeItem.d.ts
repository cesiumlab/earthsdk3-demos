import { JsonValue, ReactivePropsToNativePropsAndChanged, TreeItem, TreeItemInsertFlag } from "xbsj-base";
import { TreeItemDragDrop } from "../base";
import { SceneTree } from "./SceneTree";
import { ESSceneObject } from "../../ESObjects";
export type SceneTreeItemJsonValue = {
    name?: string;
    show?: boolean;
    collapsed?: boolean;
    sceneObj?: JsonValue;
    children?: SceneTreeItemJsonValue[];
    extras?: JsonValue;
};
export type SceneTreeItemType = 'Folder' | string;
export type SceneTreeItemInsertFlag = TreeItemInsertFlag | 'FolderInnerOrAfter' | 'FolderInnerOrBefore' | 'FolderInner';
export declare class SceneTreeItem extends TreeItem {
    private _dragDrop?;
    get dragDrop(): TreeItemDragDrop;
    private _showChangedNotAffectChildren;
    private _showChangedNotAffectParent;
    private _type;
    get type(): string;
    get typeChanged(): import("xbsj-base").Listener<[string, string]>;
    private _isExport;
    get isExport(): boolean;
    get isExportChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    set isExport(value: boolean);
    get sceneTree(): SceneTree;
    constructor(tree: SceneTree, hasChildren?: boolean, id?: string, extras?: JsonValue, isExport?: boolean);
    get jsonStr(): string;
    set jsonStr(value: string);
    get json(): SceneTreeItemJsonValue;
    set json(value: SceneTreeItemJsonValue);
    clone(): SceneTreeItem | undefined;
    insertNewTreeItem(flag: SceneTreeItemInsertFlag, newTreeItem?: TreeItem | undefined): boolean;
}
export declare namespace SceneTreeItem {
    const createDefaultProps: () => {
        name: string;
        nameEditing: boolean;
        sceneObject: ESSceneObject | undefined;
        show: boolean;
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
    };
}
export interface SceneTreeItem extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof SceneTreeItem.createDefaultProps>> {
}
