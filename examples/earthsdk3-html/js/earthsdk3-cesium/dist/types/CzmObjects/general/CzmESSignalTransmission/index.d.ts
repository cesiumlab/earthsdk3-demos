import { CzmESGeoVector } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESSignalTransmission } from "../../../ESObjects";
import { CzmSignalTransmission } from "./CzmSignalTransmission";
import { ESJEditingBindModeType } from "earthsdk3";
export { CzmSignalTransmission };
export declare class CzmESSignalTransmission extends CzmESGeoVector<ESSignalTransmission> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmSignalTransmission;
    get czmSignalTransmission(): CzmSignalTransmission;
    constructor(sceneObject: ESSignalTransmission, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
