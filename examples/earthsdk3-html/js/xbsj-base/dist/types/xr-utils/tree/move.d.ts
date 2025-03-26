import { TreeItem } from './TreeItem';
export type MoveToPositionMode = 'none' | 'before' | 'after' | 'inner';
export declare function canMoveToTreeItem(sourceItem: TreeItem, targetItem: TreeItem, mode: MoveToPositionMode): boolean;
export declare function moveToTreeItem(sourceItem: TreeItem, targetItem: TreeItem, mode: MoveToPositionMode): void;
export declare function canMoveToTreeItems<T extends TreeItem>(sourceItems: Iterable<T>, targetItem: T, mode: MoveToPositionMode): boolean;
export declare function moveToTreeItems<T extends TreeItem>(sourceItems: Iterable<T>, targetItem: T, mode: MoveToPositionMode): void;
