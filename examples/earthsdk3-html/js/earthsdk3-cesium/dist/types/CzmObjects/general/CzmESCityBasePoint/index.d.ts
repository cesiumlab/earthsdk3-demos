import { ESCityBasePoint } from "earthsdk3";
import { CzmESObjectWithLocation, CzmESPrsEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmCityBasePoint } from "./CzmCityBasePoint";
export declare class CzmESCityBasePoint extends CzmESObjectWithLocation<ESCityBasePoint> {
    static readonly type: void;
    private _czmCityBasePoint;
    get czmCityBasePoint(): CzmCityBasePoint;
    private _sCzmESPrsEditing;
    get sCzmESPrsEditing(): CzmESPrsEditing;
    constructor(sceneObject: ESCityBasePoint, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
