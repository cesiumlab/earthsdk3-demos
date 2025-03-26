import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESSignalTransmission } from "../../../ESObjects";
import { CzmSignalTransmission } from "./CzmSignalTransmission";
export { CzmSignalTransmission };
export declare class CzmESSignalTransmission extends CzmESVisualObject<ESSignalTransmission> {
    static readonly type: void;
    private _czmSignalTransmission;
    get czmSignalTransmission(): CzmSignalTransmission;
    constructor(sceneObject: ESSignalTransmission, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
