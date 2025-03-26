import { Event, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESObjectWithLocation } from "../base";
import { ESViewer } from "../../ESViewer";
import { ESJVector3D } from "../../ESJTypes";
export type ActorStatusType = 'bound' | 'created' | 'null';
export declare class ESUnrealActor extends ESObjectWithLocation {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        actorTag: string;
        actorClass: string;
        highlight: boolean;
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
    private _callFunctionEvent;
    get callFunctionEvent(): Event<[string, {
        [k: string]: any;
    }]>;
    callFunction(fn: string, param: {
        [k: string]: any;
    }): void;
    getBoundSphereWithChildren(id: string): Promise<{
        center?: ESJVector3D;
        radius?: number;
        tips?: string;
    } | undefined>;
    private _actorEvent;
    get actorEvent(): Event<[status: ActorStatusType, viewer: ESViewer]>;
    private _lastActorStatus;
    get lastActorStatus(): ActorStatusType;
    set lastActorStatus(value: ActorStatusType);
    get lastActorStatusChanged(): import("xbsj-base").Listener<[ActorStatusType, ActorStatusType]>;
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
export declare namespace ESUnrealActor {
    const createDefaultProps: () => {
        actorTag: string;
        actorClass: string;
        highlight: boolean;
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
export interface ESUnrealActor extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESUnrealActor.createDefaultProps>> {
}
