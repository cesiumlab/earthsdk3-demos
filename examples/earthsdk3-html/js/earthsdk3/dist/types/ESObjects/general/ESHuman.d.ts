import { ReactivePropsToNativePropsAndChanged, SceneObjectKey, Event } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
import { ESJVector3D } from "../../ESJTypes";
export declare class ESHuman extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        mode: string;
        animation: string;
        allowPicking: boolean;
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
    private _aiMoveToEvent;
    get aiMoveToEvent(): Event<[ESJVector3D, number]>;
    aiMoveTo(Destination: ESJVector3D, Time: number): void;
    private _stopAIMoveEvent;
    get stopAIMoveEvent(): Event<[]>;
    stopAIMove(): void;
    static defaults: {
        modes: [name: string, value: string][];
        mode: "worker" | "police" | "pedestrian";
        animations: [name: string, value: string][];
        animation: "standing" | "walking" | "running";
        czmAnimationsStand: {
            index: number;
            name: string;
            loop: string;
            animationTime: string;
        }[];
        czmAnimationsWalk: {
            index: number;
            name: string;
            loop: string;
            animationTime: string;
        }[];
        czmAnimationsRun: {
            index: number;
            name: string;
            loop: string;
            animationTime: string;
        }[];
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getESProperties(): {
        basic: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
}
export declare namespace ESHuman {
    const createDefaultProps: () => {
        mode: string;
        animation: string;
        allowPicking: boolean;
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
export interface ESHuman extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESHuman.createDefaultProps>> {
}
