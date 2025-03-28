import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { Player } from "earthsdk3";
import * as Cesium from 'cesium';
export type STCRoutPathBaseType = {
    startTime?: number;
    transmissionTime?: number;
    repeat?: number;
    color?: [number, number, number, number];
    bgColor?: [number, number, number, number];
    bidirectional?: 0 | 1 | 2 | 3;
    extra?: any;
};
export type STCRoutePathType = ({
    positions: ([number, number] | [number, number, number])[];
    width: number;
} | {
    startPos: [number, number, number];
    endPos: [number, number, number];
    heightRatio: number;
    width: number;
}) & STCRoutPathBaseType;
export declare const whiteGradientImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAABCAYAAABubagXAAAATUlEQVQYlaXLOQqEUBQF0SMmojgvpfe/JiccEvlNwwuM24IK7oXKUkof7ylQoUGHHsPDMf4WNcpociTcuHBgx4oFczg9/O0tPKP7D3wBky8UMt76XnoAAAAASUVORK5CYII=";
export type CzmSignalTransmissionCollectionRoutePathCallbackType = (this: CzmSignalTransmissionCollection, result: XbsjPositionCallbackResultType, instanceIndex: number, frameState: Cesium.FrameState | undefined) => XbsjPositionCallbackResultType | undefined;
export type XbsjPositionCallbackResultType = {
    timeRatio: number;
    repeat: number;
    color: [number, number, number, number];
    bgColor: [number, number, number, number];
    bidirectional: 0 | 1 | 2 | 3;
};
export declare class CzmSignalTransmissionCollection extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    private _player;
    get player(): Player;
    get ratio(): number;
    set ratio(value: number);
    get ratioChanged(): Listener<[number, number]>;
    private _finalImageUrlReact;
    get finalImageUrlReact(): import("xbsj-base").ReactiveVariable<string | undefined>;
    private _routePaths;
    get routePaths(): STCRoutePathType[] | undefined;
    set routePaths(value: STCRoutePathType[] | undefined);
    get routePathsChanged(): Listener<[STCRoutePathType[] | undefined, STCRoutePathType[] | undefined]>;
    static whiteGradientImageBase64: string;
    routePathCallback?: CzmSignalTransmissionCollectionRoutePathCallbackType;
    static defaultRoutePathCallback: (this: CzmSignalTransmissionCollection, result: XbsjPositionCallbackResultType, instanceIndex: number, frameState: Cesium.FrameState | undefined) => XbsjPositionCallbackResultType;
    static routePathCallbackStrMd: string;
    private _id;
    get id(): SceneObjectKey;
    set id(value: SceneObjectKey);
    get idChanged(): Listener<[string, string]>;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        loop: boolean;
        startTime: number;
        currentTime: number;
        playerCurrentTime: number;
        duration: number;
        speed: number;
        playing: boolean;
        transmissionTime: number;
    };
    static defaultImageUri: string;
}
export declare namespace CzmSignalTransmissionCollection {
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
        positionsSet: import("xbsj-base").ReactiveVariable<[number, number, number][][] | undefined>;
        data: import("xbsj-base").ReactiveVariable<STCRoutePathType[] | undefined>;
        geoJsonUrl: string;
        allowPicking: boolean;
        routePathCallbackStr: string;
        loop: boolean | undefined;
        currentTime: number | undefined;
        duration: number | undefined;
        speed: number | undefined;
        playing: boolean | undefined;
    };
}
export interface CzmSignalTransmissionCollection extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmSignalTransmissionCollection.createDefaultProps>> {
}
