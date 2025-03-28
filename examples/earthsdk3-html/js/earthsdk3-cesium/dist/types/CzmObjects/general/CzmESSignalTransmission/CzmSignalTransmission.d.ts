import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { CzmSignalTransmissionCollection } from "./CzmSignalTransmissionCollection";
export declare class CzmSignalTransmission extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _collection;
    get collection(): CzmSignalTransmissionCollection;
    get player(): import("../../../utils").Player;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        loop: boolean;
        currentTime: number;
        playerCurrentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        transmissionTime: number;
    };
    static defaultImageUri: string;
}
export declare namespace CzmSignalTransmission {
    const createDefaultProps: () => {
        show: boolean;
        imageUrl: string | undefined;
        repeat: number;
        bidirectional: 0 | 2 | 3 | 1;
        startTime: number;
        transmissionTime: number | undefined;
        color: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        bgColor: import("xbsj-base").ReactiveVariable<[number, number, number, number]>;
        width: number;
        repeatLength: number;
        arcType: "GEODESIC" | "NONE" | "RHUMB";
        brightening: boolean;
        depthTest: boolean;
        positions: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
        heightRatio: number;
        allowPicking: boolean;
        loop: boolean | undefined;
        currentTime: number | undefined;
        duration: number | undefined;
        speed: number | undefined;
        playing: boolean | undefined;
    };
}
export interface CzmSignalTransmission extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmSignalTransmission.createDefaultProps>> {
}
