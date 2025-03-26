import { ESTextLabel } from "earthsdk3";
import { CzmESLabel, CzmImageModel, GeoDivTextPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, ObjResettingWithEvent } from "xbsj-base";
export declare class TextLabel2D extends Destroyable {
    private czmViewer;
    private _czmTextLabel;
    get czmTextLabel(): GeoDivTextPoi;
    flyTo: (duration: number | undefined, id: number) => void;
    constructor(sceneObject: ESTextLabel, czmViewer: ESCesiumViewer);
}
export declare class TextLabel3D extends Destroyable {
    private sceneObject;
    private _czmViewer;
    private _czmTextLabel;
    get czmTextLabel(): GeoDivTextPoi;
    private _czmImageModel;
    get czmImageModel(): CzmImageModel;
    private _url;
    get url(): string;
    private _defaultSize;
    get defaultSize(): [number, number];
    get defaultSizeChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    private _size;
    get size(): [number, number];
    get sizeChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    private _eventInfo;
    private _isPointEvent;
    flyTo: (duration: number | undefined, id: number) => Promise<boolean | undefined> | undefined;
    constructor(sceneObject: ESTextLabel, _czmViewer: ESCesiumViewer);
}
export declare class CzmESTextLabel extends CzmESLabel<ESTextLabel> {
    static readonly type: void;
    private _event;
    get event(): import("xbsj-base").NextAnimateFrameEvent;
    private _resetting;
    get resetting(): ObjResettingWithEvent<TextLabel2D | TextLabel3D, import("xbsj-base").NextAnimateFrameEvent>;
    constructor(sceneObject: ESTextLabel, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
