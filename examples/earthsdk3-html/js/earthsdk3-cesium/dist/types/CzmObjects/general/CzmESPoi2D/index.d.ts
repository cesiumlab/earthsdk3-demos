import { ESPoi2D } from "earthsdk3";
import { CzmESLabel } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Event } from "xbsj-base";
export declare class CzmESPoi2D extends CzmESLabel<ESPoi2D> {
    static readonly type: void;
    private _widgetComponent;
    get widgetComponent(): any;
    set widgetComponent(v: any);
    private _updateImageEvent;
    get updateImageEvent(): Event<[]>;
    updateImage(): void;
    private _textBox;
    private _iconBox;
    private _icon;
    private _anchor;
    constructor(sceneObject: ESPoi2D, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
