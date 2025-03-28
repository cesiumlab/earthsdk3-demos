import { Event, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESLabel } from "../base";
export declare class ESPoi2D extends ESLabel {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        mode: string;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        autoAnchor: boolean;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
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
        modes: [name: string, value: string][];
        mode: "SquareH01" | "SquareH02" | "SquareV01" | "SquareV02" | "SquareV03" | "SquareV04" | "Flag01" | "Flag02" | "Linear01" | "Linear02" | "Linear03" | "CircularH01" | "CircularH02" | "CircularV01" | "CircularV02" | "CircularV03" | "CircularV04" | "CircularV05" | "P3D01" | "P3D02" | "P3D03" | "P3D04" | "P3D05" | "P3D06" | "P3D07" | "Diamond01" | "Diamond02" | "Stranger" | "ManNormal" | "ManAbnormal" | "WomanNormal" | "WomanAbnormal" | "Camera" | "UCVertical";
        style: {
            [xx: string]: any;
        };
        autoAnchor: boolean;
        screenRender: boolean;
        size: import("../../ESJTypes").ESJVector2D;
        anchor: import("../../ESJTypes").ESJVector2D;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    initialStyle: import("xbsj-base").ReactiveVariable<undefined>;
    private _getInitialStyleEvent;
    get getInitialStyleEvent(): Event<[]>;
    getInitialStyle(): Promise<{
        [key: string]: any;
    } | undefined>;
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
export declare namespace ESPoi2D {
    const createDefaultProps: () => {
        mode: string;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        autoAnchor: boolean;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector2D>;
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
export interface ESPoi2D extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESPoi2D.createDefaultProps>> {
}
