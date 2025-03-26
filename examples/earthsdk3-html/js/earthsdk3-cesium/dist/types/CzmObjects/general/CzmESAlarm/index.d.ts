import { ESAlarm } from "earthsdk3";
import { CzmESObjectWithLocation, CzmModelPrimitive } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESAlarm extends CzmESObjectWithLocation<ESAlarm> {
    static readonly type: void;
    private _czmModelPrimitive;
    get czmModelPrimitive(): CzmModelPrimitive | undefined;
    constructor(sceneObject: ESAlarm, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
