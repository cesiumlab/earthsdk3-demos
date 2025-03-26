import { ESBlastParticleSystem } from "earthsdk3";
import { CzmESObjectWithLocation, CzmParticleSystemPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESBlastParticleSystem extends CzmESObjectWithLocation<ESBlastParticleSystem> {
    static readonly type: void;
    private _czmBlastParticeSystem;
    get czmBlastParticeSystem(): CzmParticleSystemPrimitive;
    constructor(sceneObject: ESBlastParticleSystem, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
