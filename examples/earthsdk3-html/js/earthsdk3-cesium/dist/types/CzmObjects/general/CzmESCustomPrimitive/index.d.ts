import { CzmCustomPrimitive, CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESCustomPrimitive } from "../../../ESObjects";
export declare class CzmESCustomPrimitive extends CzmESObjectWithLocation<ESCustomPrimitive> {
    static readonly type: void;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    constructor(sceneObject: ESCustomPrimitive, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
