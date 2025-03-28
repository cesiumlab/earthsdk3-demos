import { ESJEditingBindModeType, ESRectangle } from "earthsdk3";
import { CzmESGeoVector, CzmRectangle } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESRectangle extends CzmESGeoVector<ESRectangle> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmESRectangle;
    get czmESRectangle(): CzmRectangle;
    constructor(sceneObject: ESRectangle, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
