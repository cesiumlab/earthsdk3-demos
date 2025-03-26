import { Destroyable } from "xbsj-base";
import { ESViewer, ESImageryLayer } from "earthsdk3";
import { ESGeHistoryImagery } from "./index";
export declare class GetCurrentTileCoordinates extends Destroyable {
    constructor(viewer: ESViewer, sceneObject: ESGeHistoryImagery, esImageryLayer: ESImageryLayer);
}
