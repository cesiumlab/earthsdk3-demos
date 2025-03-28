import { CzmESGeoVector } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESRoad } from "../../../ESObjects";
import { CzmRoad } from "./CzmRoad";
import { ESJEditingBindModeType } from "earthsdk3";
export declare class CzmESRoad extends CzmESGeoVector<ESRoad> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmESRoad;
    get czmESRoad(): CzmRoad;
    constructor(sceneObject: ESRoad, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
