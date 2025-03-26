import * as Cesium from 'cesium';
import { Destroyable } from 'xbsj-base';
import { ESCesiumViewer } from '../../index';
export declare class Rain extends Destroyable {
    private _show;
    get show(): boolean;
    set show(value: boolean);
    get showChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    rainPostProcess: Cesium.PostProcessStage | undefined;
    constructor(czmViewer: ESCesiumViewer);
}
