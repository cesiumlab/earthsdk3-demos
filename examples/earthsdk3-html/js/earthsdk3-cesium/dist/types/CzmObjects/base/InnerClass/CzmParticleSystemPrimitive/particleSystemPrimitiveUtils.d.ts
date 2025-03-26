import * as Cesium from 'cesium';
import { ESJParticleEmitterJsonType } from "earthsdk3";
export declare function createParticleSystemEmitterFromJson(particleSystemJson: ESJParticleEmitterJsonType): Cesium.BoxEmitter | Cesium.CircleEmitter | Cesium.ConeEmitter | Cesium.SphereEmitter | undefined;
