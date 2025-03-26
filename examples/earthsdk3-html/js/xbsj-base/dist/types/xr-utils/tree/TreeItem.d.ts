import { Destroyable, Event, ObservableArray } from 'xbsj-base';
import { MoveToPositionMode } from './move';
import { Tree } from './Tree';
import { UiTreeObject } from './UiTreeObject';
export type TreeItemInsertFlag = 'InnerOrBefore' | 'InnerOrAfter' | 'Inner' | 'Before' | 'After';
export declare class TreeItem extends Destroyable {
    private _tree;
    private _hasChildren;
    private _children?;
    private _childrenResetedEvent?;
    private _childrenToChangeEvent?;
    private _childrenChangedEvent?;
    private _parent;
    private _level;
    private _id;
    static wm: Map<string, TreeItem>;
    static getFromId(id: string): TreeItem | undefined;
    private _uiTreeObject;
    get uiTreeObject(): UiTreeObject<this>;
    static allTreeItems: Map<string, TreeItem>;
    constructor(_tree: Tree<TreeItem>, _hasChildren?: boolean, id?: string);
    get id(): string;
    private _updateLevel;
    get parent(): TreeItem | undefined;
    get parentChanged(): import("xbsj-base").Listener<[TreeItem | undefined, TreeItem | undefined]>;
    get children(): ObservableArray<TreeItem> | undefined;
    get childrenResetedEvent(): Event<[boolean]>;
    get childrenToChangeEvent(): Event<[changeInfos: import("xbsj-base").ObservableArrayChangeInfo<TreeItem>[], target: ObservableArray<TreeItem>]>;
    get childrenChangedEvent(): Event<[target: ObservableArray<TreeItem>]>;
    resetChildren(recreate?: boolean): void;
    getDescendants(traverseFunc?: (treeItem: TreeItem) => boolean): Generator<TreeItem, void, unknown>;
    getAncestors(traverseFunc?: (treeItem: TreeItem) => boolean): Generator<TreeItem, void, unknown>;
    isDescendantOf(treeItem: TreeItem): boolean;
    isAncestorOf(treeItem: TreeItem): boolean;
    get level(): number;
    get levelChanged(): import("xbsj-base").Listener<[number, number]>;
    get tree(): Tree<TreeItem>;
    canMoveTo(targetItem: TreeItem, mode: MoveToPositionMode): boolean;
    moveTo(targetItem: TreeItem, mode: MoveToPositionMode): void;
    detachFromParent(): void;
    /**
     * 在当前节点上右键新建节点，如果当前节点是组节点(有children)，则加入子节点数组中；否则插入当前节点之前（作为兄弟节点）
     * 新节点成功挂接，返回true，否则false
     * @param flag 'InnerOrBefor' | 'InnerOrAfter' | 'Inner' | 'Before' | 'After'
     * @param newTreeItem 需要新加入的节点，如果为undefined，表示测试是否能在当前节点加入新节点
     * @returns
     */
    insertNewTreeItem(flag: TreeItemInsertFlag, newTreeItem?: TreeItem): boolean;
}
