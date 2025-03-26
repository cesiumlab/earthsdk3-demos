import { TreeItem } from "./TreeItem";
export type RedrawInfo<T extends TreeItem> = {
    topFreeSpaceHeight: number;
    topUnvisibleItemNum: number;
    middleTreeItems: T[];
    bottomFreeSpaceHeight: number;
    bottomUnvisibleItemNum: number;
};
