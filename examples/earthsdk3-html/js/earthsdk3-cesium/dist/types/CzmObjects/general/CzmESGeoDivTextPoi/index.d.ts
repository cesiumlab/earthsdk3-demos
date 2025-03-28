import { ESGeoDivTextPoi } from "earthsdk3";
import { CzmESObjectWithLocation, GeoDivTextPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoDivTextPoi<T extends ESGeoDivTextPoi = ESGeoDivTextPoi> extends CzmESObjectWithLocation<T> {
    static readonly type: void;
    private _czmDivTextPoi;
    get czmDivTextPoi(): GeoDivTextPoi;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
