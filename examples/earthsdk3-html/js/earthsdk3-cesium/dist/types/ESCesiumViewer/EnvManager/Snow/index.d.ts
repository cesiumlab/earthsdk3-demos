import * as Cesium from 'cesium';
import { Destroyable } from 'xbsj-base';
import { ESCesiumViewer } from '../../index';
export declare class Snow extends Destroyable {
    private _show;
    get show(): boolean;
    set show(value: boolean);
    get showChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _alpha;
    get alpha(): number;
    set alpha(value: number);
    get alphaChanged(): import("xbsj-base").Listener<[number, number]>;
    snow: Cesium.PostProcessStage | undefined;
    snowCover: Cesium.PostProcessStage | undefined;
    constructor(czmViewer: ESCesiumViewer);
}
