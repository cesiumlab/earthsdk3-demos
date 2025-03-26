import { ESApertureEffect } from "earthsdk3";
import { CzmCustomPrimitive, CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESApertureEffect extends CzmESObjectWithLocation<ESApertureEffect> {
    static readonly type: void;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    constructor(sceneObject: ESApertureEffect, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
