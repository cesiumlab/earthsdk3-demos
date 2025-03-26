import { ESParticleSystemPrimitive } from "earthsdk3";
import { CzmESObjectWithLocation, CzmParticleSystemPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESParticleSystemPrimitive extends CzmESObjectWithLocation<ESParticleSystemPrimitive> {
    static readonly type: void;
    private _czmESParticleSystemPrimitive;
    get czmESParticleSystemPrimitive(): CzmParticleSystemPrimitive;
    constructor(sceneObject: ESParticleSystemPrimitive, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
