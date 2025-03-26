import { ESPoi2D, ESWidget } from "earthsdk3";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
import { CzmCustomPrimitive, CzmTexture } from "../../../../CzmObjects";
export declare class Widget3D extends Destroyable {
    private _sceneObject;
    private _czmViewer;
    private _widgetInfo;
    private _drawWidget;
    widgetInfo: HTMLElement;
    private _eventInfo;
    private _isPointEvent;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    private _czmTexture;
    get czmTexture(): CzmTexture;
    sceneObject: ESPoi2D | ESWidget;
    domSize: {
        [xx: string]: any;
    } | undefined;
    private _defaultAnchor;
    get defaultAnchor(): [number, number];
    set defaultAnchor(value: [number, number]);
    get defaultAnchorChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    czmViewer: ESCesiumViewer;
    constructor(_sceneObject: ESWidget | ESPoi2D, _czmViewer: ESCesiumViewer, _widgetInfo: HTMLElement, _drawWidget: boolean, listenAnchor?: boolean);
    flyTo: (duration: number | undefined, id: number) => void;
}
