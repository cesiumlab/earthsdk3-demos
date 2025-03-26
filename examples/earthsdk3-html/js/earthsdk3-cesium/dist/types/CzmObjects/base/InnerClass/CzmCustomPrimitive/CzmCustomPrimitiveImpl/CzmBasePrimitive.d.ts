import * as Cesium from 'cesium';
import { Destroyable } from 'xbsj-base';
export declare abstract class CzmBasePrimitive extends Destroyable {
    private _show;
    get show(): boolean;
    set show(value: boolean);
    get showChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    abstract update(frameState: Cesium.FrameState): void;
}
