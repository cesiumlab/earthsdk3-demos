import { Destroyable } from "xbsj-base";
import { ESViewer } from "../index";
/**
 * 光照时间与动画模拟时间同步
 */
export declare class TimeSyncEventResetting extends Destroyable {
    private _viewer;
    constructor(_viewer: ESViewer);
}
export declare class SyncEventResetting extends Destroyable {
    private _viewer;
    private _activeViewer;
    constructor(_viewer: ESViewer, _activeViewer: ESViewer);
}
