import { ESImageLabel } from "earthsdk3";
import { CzmESLabel, GeoCanvasImagePoi } from "../../../CzmObjects";
import { CzmImageModel } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
export declare class ImageLabel2D extends Destroyable {
    private sceneObject;
    private czmViewer;
    private _czmGeoCanvasImagePoi;
    get czmGeoCanvasImagePoi(): GeoCanvasImagePoi;
    flyTo: (duration: number | undefined, id: number) => void;
    constructor(sceneObject: ESImageLabel, czmViewer: ESCesiumViewer);
}
export declare class ImageLabel3D extends Destroyable {
    private sceneObject;
    private czmViewer;
    private _czmGeoImageModel;
    get czmGeoImageModel(): CzmImageModel;
    private _eventInfo;
    private _isPointEvent;
    flyTo: (duration: number | undefined, id: number) => Promise<boolean | undefined> | undefined;
    constructor(sceneObject: ESImageLabel, czmViewer: ESCesiumViewer, czmESImageLabel: CzmESImageLabel);
}
export declare class CzmESImageLabel extends CzmESLabel<ESImageLabel> {
    static readonly type: void;
    private _resetting;
    get resetting(): ObjResettingWithEvent<ImageLabel2D | ImageLabel3D, import("xbsj-base").NextAnimateFrameEvent> | undefined;
    constructor(sceneObject: ESImageLabel, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
