import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESLabel } from "../base";
import { ESJResource, ESJVector2D } from "../../ESJTypes";
/**
 * https://www.wolai.com/earthsdk/nQC5LdV6sHdtLxve1bnbLz
 */
export declare class ESImageLabel extends ESLabel {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        url: string | ESJResource;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
        actorTag: string;
        socketName: string;
        positionOffset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotationOffset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
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
    static defaults: {
        url: string;
        anchor: ESJVector2D;
        renderMode: number;
        screenRender: boolean;
        size: ESJVector2D;
        sizeByContent: boolean;
        rotationType: number;
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
export declare namespace ESImageLabel {
    const createDefaultProps: () => {
        url: string | ESJResource;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
        actorTag: string;
        socketName: string;
        positionOffset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotationOffset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
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
export interface ESImageLabel extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESImageLabel.createDefaultProps>> {
}
