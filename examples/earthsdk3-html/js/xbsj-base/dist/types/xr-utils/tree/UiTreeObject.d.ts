import { Destroyable } from "xbsj-base";
import { CheckedStatus } from "./CheckedStatus";
import { MoveToPositionMode } from "./move";
import { TreeItem } from "./TreeItem";
export declare class UiTreeObject<T extends TreeItem> extends Destroyable {
    private _treeItem;
    private _collapsed;
    private _checkedStatus;
    private _selected;
    private _moveToPositionMode;
    private _updateCheckedStatusFromChildrenEvent;
    constructor(_treeItem: T);
    get treeItem(): T;
    get collapsed(): boolean;
    set collapsed(value: boolean);
    get collapsedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    get checkedStatus(): CheckedStatus;
    check(value: boolean): void;
    updateCheckedStatusFromChildren(): void;
    get checkedStatusChanged(): import("xbsj-base").Listener<[CheckedStatus, CheckedStatus]>;
    get selected(): boolean;
    set selected(value: boolean);
    get selectedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    get moveToPositionMode(): MoveToPositionMode;
    set moveToPositionMode(value: MoveToPositionMode);
    get moveToPositionModeChanged(): import("xbsj-base").Listener<[MoveToPositionMode, MoveToPositionMode]>;
}
