import { ESFireParticleSystem } from "earthsdk3";
import { CzmESObjectWithLocation, CzmParticleSystemPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESFireParticleSystem extends CzmESObjectWithLocation<ESFireParticleSystem> {
    static readonly type: void;
    private _czmFireParticleSystem;
    get czmFireParticleSystem(): CzmParticleSystemPrimitive;
    constructor(sceneObject: ESFireParticleSystem, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
