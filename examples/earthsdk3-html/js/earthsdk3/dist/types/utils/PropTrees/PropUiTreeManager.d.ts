import { ESSceneObject } from "../../ESObjects";
import { Destroyable, UniteChanged } from "xbsj-base";
import { PropTree } from "./PropTree";
export declare function createPropTreeFromSceneObject(sceneObject: ESSceneObject, itemDivHeight: number): PropTree;
export declare class PropUiTreeManager extends Destroyable {
    private _propTreeReact;
    get propTree(): PropTree | undefined;
    get propTreeChanged(): import("xbsj-base").Listener<[PropTree | undefined, PropTree | undefined]>;
    constructor(itemDivHeight: number);
}
export declare namespace PropUiTreeManager {
    const createDefaultProps: () => {
        sceneObject: ESSceneObject | undefined;
    };
}
export interface PropUiTreeManager extends UniteChanged<ReturnType<typeof PropUiTreeManager.createDefaultProps>> {
}
