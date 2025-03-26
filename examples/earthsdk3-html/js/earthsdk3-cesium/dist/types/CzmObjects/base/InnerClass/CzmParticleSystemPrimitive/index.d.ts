import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { PositionEditing } from "../../Editing";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Player, ESJParticleEmitterJsonType } from "earthsdk3";
import * as Cesium from 'cesium';
export declare class CzmParticleSystemPrimitive extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _player;
    get player(): Player;
    private _updateCallbackFunc;
    get updateCallbackFunc(): Function | undefined;
    set updateCallbackFunc(value: Function | undefined);
    get updateCallbackFuncChanged(): Listener<[Function | undefined, Function | undefined]>;
    private _disposeUpdateCallbackFunc;
    private _disposeUpdateCallback;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing;
    private _primitive?;
    get primitive(): Cesium.ParticleSystem | undefined;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        playingLoop: boolean;
        currentTime: number;
        playerCurrentTime: number;
        duration: number;
        playingSpeed: number;
        playing: boolean;
        ratio: number;
        particleLife: number;
        endScale: number;
        imageSize: [number, number];
        image: string;
        emitter: ESJParticleEmitterJsonType;
    };
}
export declare namespace CzmParticleSystemPrimitive {
    const createDefaultProps: () => {
        emitter: import("xbsj-base").ReactiveVariable<ESJParticleEmitterJsonType | undefined>;
        bursts: import("xbsj-base").ReactiveVariable<[time?: number | undefined, minimum?: number | undefined, maximum?: number | undefined][] | undefined>;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        translation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        rotation: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        positionEditing: boolean;
        image: string | undefined;
        imageSize: [number, number] | undefined;
        minimumImageSize: [number, number] | undefined;
        maximumImageSize: [number, number] | undefined;
        show: boolean | undefined;
        updateCallback: string | undefined;
        emissionRate: number | undefined;
        loop: boolean | undefined;
        scale: number | undefined;
        startScale: number | undefined;
        endScale: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        startColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        endColor: import("xbsj-base").ReactiveVariable<[number, number, number, number] | undefined>;
        sizeInMeters: boolean | undefined;
        speed: number | undefined;
        minimumSpeed: number | undefined;
        maximumSpeed: number | undefined;
        lifetime: number | undefined;
        particleLife: number | undefined;
        minimumParticleLife: number | undefined;
        maximumParticleLife: number | undefined;
        mass: number | undefined;
        minimumMass: number | undefined;
        maximumMass: number | undefined;
        playingLoop: boolean | undefined;
        currentTime: number | undefined;
        duration: number | undefined;
        playingSpeed: number | undefined;
        playing: boolean | undefined;
    };
}
export interface CzmParticleSystemPrimitive extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmParticleSystemPrimitive.createDefaultProps>> {
}
