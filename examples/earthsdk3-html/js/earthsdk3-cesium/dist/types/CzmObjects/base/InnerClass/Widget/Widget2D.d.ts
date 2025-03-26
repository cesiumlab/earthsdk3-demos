import { ESPoi2D, ESWidget } from "earthsdk3";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
import { GeoCustomDivPoi } from "../../../../CzmObjects";
export declare class Widget2D extends Destroyable {
    private _sceneObject;
    private _czmViewer;
    private _widgetInfo;
    private _drawWidget;
    widgetInfo: HTMLElement;
    private _czmGeoCustomDivPoi;
    get czmGeoCustomDivPoi(): GeoCustomDivPoi<{
        destroy(): undefined;
    }>;
    sceneObject: ESPoi2D | ESWidget;
    domSize: {
        [xx: string]: any;
    } | undefined;
    private _defaultAnchor;
    get defaultAnchor(): [number, number];
    set defaultAnchor(value: [number, number]);
    get defaultAnchorChanged(): import("xbsj-base").Listener<[[number, number], [number, number]]>;
    constructor(_sceneObject: ESWidget | ESPoi2D, _czmViewer: ESCesiumViewer, _widgetInfo: HTMLElement, _drawWidget: boolean, listenAnchor?: boolean);
    flyTo: (duration: number | undefined, id: number) => void;
    private createInstanceClass;
}
