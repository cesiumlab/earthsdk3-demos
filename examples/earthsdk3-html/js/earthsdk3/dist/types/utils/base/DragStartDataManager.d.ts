import { Destroyable, TreeItem } from "xbsj-base";
export type DragStartData = {
    type: 'UITreeA';
    value: TreeItem;
} | {
    type: 'Other';
    value: any[];
};
export declare class DragStartDataManager extends Destroyable {
    private _data;
    constructor();
    set data(value: DragStartData | undefined);
    get data(): DragStartData | undefined;
    get dataChanged(): import("xbsj-base").Listener<[DragStartData | undefined, DragStartData | undefined]>;
}
