import { ESCar } from "earthsdk3";
import { CzmESObjectWithLocation, CzmModelPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESCar extends CzmESObjectWithLocation<ESCar> {
    static readonly type: void;
    private _czmModelPrimitive;
    get czmModelPrimitive(): CzmModelPrimitive | undefined;
    constructor(sceneObject: ESCar, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
