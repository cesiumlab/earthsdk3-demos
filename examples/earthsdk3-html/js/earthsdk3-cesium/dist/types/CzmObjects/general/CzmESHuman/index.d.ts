import { ESHuman } from "earthsdk3";
import { CzmESObjectWithLocation, CzmModelPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESHuman extends CzmESObjectWithLocation<ESHuman> {
    static readonly type: void;
    private _czmModelPrimitive;
    get czmModelPrimitive(): CzmModelPrimitive | undefined;
    constructor(sceneObject: ESHuman, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
