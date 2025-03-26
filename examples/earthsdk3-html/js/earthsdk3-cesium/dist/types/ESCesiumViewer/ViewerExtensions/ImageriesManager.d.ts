import { Destroyable, Listener, ObjResettingWithEvent } from "xbsj-base";
import * as Cesium from 'cesium';
import { CzmImagery } from "../../CzmObjects";
declare class CzmImageryLayersManager extends Destroyable {
    private _viewer;
    get viewer(): Cesium.Viewer;
    private _czmImageryLayerWrappers;
    get czmImageryLayerWrappers(): Set<CzmImageryLayerWrapper>;
    private _zIndexChangedEvent;
    constructor(_viewer: Cesium.Viewer);
    add(czmImageryLayerWrapper: CzmImageryLayerWrapper): void;
    delete(czmImageryLayerWrapper: CzmImageryLayerWrapper): void;
    zIndexChange(): void;
}
declare class CzmImageryLayerWrapper extends Destroyable {
    private _czmImageryWrapper;
    private _imageryLayer;
    get imageryLayer(): Cesium.ImageryLayer;
    get czmImageryWrapper(): CzmImageryWrapper;
    constructor(_czmImageryWrapper: CzmImageryWrapper);
}
declare class czmImageryWrapperWithShow extends Destroyable {
    private _czmImageryWrapper;
    get czmImageryWrapper(): CzmImageryWrapper;
    private _objResetting;
    get objResetting(): ObjResettingWithEvent<CzmImageryLayerWrapper, Listener<[boolean, boolean]>>;
    constructor(_czmImageryWrapper: CzmImageryWrapper);
}
declare class CzmImageryWrapper extends Destroyable {
    private _imagery;
    private _manager;
    get imagery(): CzmImagery;
    get manager(): ImageriesManager;
    private _czmImageryLayerWrapperObjResetting;
    get czmImageryLayerWrapperObjResetting(): ObjResettingWithEvent<czmImageryWrapperWithShow, Listener<[Cesium.ImageryLayer | undefined, Cesium.ImageryLayer | undefined]>>;
    constructor(_imagery: CzmImagery, _manager: ImageriesManager);
}
export declare class ImageriesManager extends Destroyable {
    private _viewer;
    private _czmImageryWrappers;
    get czmImageryWrappers(): Set<CzmImageryWrapper>;
    private _czmImageryLayersManager;
    get czmImageriesManager(): CzmImageryLayersManager;
    get viewer(): Cesium.Viewer;
    constructor(_viewer: Cesium.Viewer);
    add(imagery: CzmImagery): void;
    delete(imagery: CzmImagery): void;
}
export {};
