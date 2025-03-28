import { Event, SceneObjectKey, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
import { ESJColor, ESJResource, ESJVector3D } from "../../ESJTypes";
import { ESJInstances } from "../../ESJTypes/properties/ESJInstances";
type ModelNodeTransformation = {
    translationX: number;
    translationY: number;
    translationZ: number;
    rotationHeading: number;
    rotationPitch: number;
    rotationRoll: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
};
/**
 * https://www.wolai.com/earthsdk/sJisEK7X7WgurSVJK6kXTe
 */
export declare class ESGltfModel extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        czmMaximumScale: number | undefined;
        czmMinimumPixelSize: number;
        czmNativeScale: number;
        czmColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        allowPicking: boolean;
        instances: import("xbsj-base").ReactiveVariable<ESJInstances | undefined>;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    private _nodeTransformations;
    get nodeTransformations(): {
        [key: string]: ModelNodeTransformation;
    } | undefined;
    set nodeTransformations(value: {
        [key: string]: ModelNodeTransformation;
    } | undefined);
    get nodeTransformationsChanged(): import("xbsj-base").Listener<[{
        [key: string]: ModelNodeTransformation;
    } | undefined, {
        [key: string]: ModelNodeTransformation;
    } | undefined]>;
    private _czmModelReadyEvent;
    get czmModelReadyEvent(): Event<[model: any]>;
    deleteNodeTransformation(nodeName: string): void;
    private _setNodePositionEvent;
    get setNodePositionEvent(): Event<[string, ESJVector3D]>;
    setNodePosition(nodeName: string, nodePosition: ESJVector3D): void;
    private _setNodeRotationEvent;
    get setNodeRotationEvent(): Event<[string, ESJVector3D]>;
    setNodeRotation(nodeName: string, nodeRotation: ESJVector3D): void;
    private _setNodeScaleEvent;
    get setNodeScaleEvent(): Event<[string, ESJVector3D]>;
    setNodeScale(nodeName: string, nodeScale: ESJVector3D): void;
    getNodePosition(nodeName: string): ESJVector3D | undefined;
    getNodeRotation(nodeName: string): ESJVector3D | undefined;
    getNodeScale(nodeName: string): ESJVector3D | undefined;
    private _printDebugInfoEvent;
    get printDebugInfoEvent(): Event<[]>;
    printDebugInfo(): void;
    static defaults: {
        url: string;
        instances: never[];
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getESProperties(): {
        defaultMenu: string;
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESGltfModel {
    const createDefaultProps: () => {
        url: string | ESJResource;
        czmMaximumScale: number | undefined;
        czmMinimumPixelSize: number;
        czmNativeScale: number;
        czmColor: import("xbsj-base").ReactiveVariable<ESJColor>;
        allowPicking: boolean;
        instances: import("xbsj-base").ReactiveVariable<ESJInstances | undefined>;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESGltfModel extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESGltfModel.createDefaultProps>> {
}
export {};
