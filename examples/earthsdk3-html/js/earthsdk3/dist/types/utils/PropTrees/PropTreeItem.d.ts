import { GroupProperty, Property } from "../../ESJTypes";
import { ObservableArray, TreeItem } from "xbsj-base";
import { PropTree } from "./PropTree";
export declare class BasePropTreeItem extends TreeItem {
    private _property;
    constructor(tree: PropTree, hasChildren: boolean, _property: Property);
    get property(): Property;
}
export declare class LeafPropTreeItem extends BasePropTreeItem {
    constructor(tree: PropTree, property: Property);
}
export declare class GroupPropTreeItem extends BasePropTreeItem {
    constructor(tree: PropTree, groupProperty: GroupProperty);
    get groupChildren(): ObservableArray<TreeItem>;
}
