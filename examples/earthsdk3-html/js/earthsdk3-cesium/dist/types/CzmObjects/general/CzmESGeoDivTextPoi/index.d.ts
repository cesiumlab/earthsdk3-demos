import { ESGeoDivTextPoi } from "earthsdk3";
import { CzmESEditing, CzmESObjectWithLocation, GeoDivTextPoi } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoDivTextPoi<T extends ESGeoDivTextPoi = ESGeoDivTextPoi> extends CzmESObjectWithLocation<T> {
    static readonly type: void;
    private _czmDivTextPoi;
    get czmDivTextPoi(): GeoDivTextPoi;
    private _sEditing;
    get sEditing(): CzmESEditing;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
