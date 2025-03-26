import { ESViewShed } from "earthsdk3";
import { CzmESObjectWithLocation, RayEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { XbsjViewshed } from "./XbsjViewshed";
export declare class CzmESViewShed extends CzmESObjectWithLocation<ESViewShed> {
    static readonly type: void;
    private _czmViewShed;
    get czmViewShed(): XbsjViewshed | undefined;
    private _rayEditing;
    get rayEditing(): RayEditing | undefined;
    private _innerPositionReact;
    private _innerRotationReact;
    constructor(sceneObject: ESViewShed, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
