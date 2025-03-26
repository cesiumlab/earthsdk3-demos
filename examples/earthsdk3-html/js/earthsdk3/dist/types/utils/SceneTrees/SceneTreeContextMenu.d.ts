import { Destroyable } from "xbsj-base";
import { SceneTree } from "./SceneTree";
import { SceneTreeItem } from "./SceneTreeItem";
import { ESObjectsManager } from "../../ESObjectManager";
export type MenuContentType = {
    text: string;
    keys: string;
    func: () => void;
} | {
    type: "divider";
};
export type TreeItemContexMenuCallbackType = (contextMenuItems: MenuContentType[], item: SceneTreeItem | undefined, sceneTree: SceneTree, projectManager: ESObjectsManager) => void;
export declare class SceneTreeContextMenu extends Destroyable {
    private _sceneTree;
    private _projectManager;
    get sceneTree(): SceneTree;
    treeItemContexMenuCallback: TreeItemContexMenuCallbackType | undefined;
    constructor(_sceneTree: SceneTree, _projectManager: ESObjectsManager);
}
