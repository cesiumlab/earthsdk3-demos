import { ESObjectsManager } from "./index";
import { GroupPropTreeItem, LeafPropTreeItem, PropTree } from "../utils";
import { Property } from "../ESJTypes";
export type PropertyCompCallbackFuncParamsType = {
    componentInstance: any;
    property: Property;
    customEventName: string;
    otherParams?: any[];
};
export type propTreeCallbackParamsType = PropertyCompCallbackFuncParamsType & {
    treeItem: GroupPropTreeItem | LeafPropTreeItem;
    propTree: PropTree;
};
export declare function propTreeCallback(objm: ESObjectsManager, params: propTreeCallbackParamsType): void;
