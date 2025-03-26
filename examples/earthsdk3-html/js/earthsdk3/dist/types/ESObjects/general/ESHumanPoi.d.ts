import { ESJVector2D } from "../../ESJTypes";
import { UniteChanged } from "xbsj-base";
import { ESHuman } from "./ESHuman";
/**
 * https://www.wolai.com/earthsdk/3BJMp3dWPNFrGjcTC7junh
 */
export declare class ESHumanPoi extends ESHuman {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        mode: string;
        animation: string;
        allowPicking: boolean;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
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
        poiOffsetHeight: number;
        poiMode: string;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        autoAnchor: boolean;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
    };
    private _human;
    private _poi;
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
    constructor(id?: string);
}
export declare namespace ESHumanPoi {
    const createDefaultProps: () => {
        mode: string;
        animation: string;
        allowPicking: boolean;
        position: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../../ESJTypes").ESJVector3D>;
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
        poiOffsetHeight: number;
        poiMode: string;
        style: import("xbsj-base").ReactiveVariable<{
            [xx: string]: any;
        }>;
        autoAnchor: boolean;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
    };
}
export interface ESHumanPoi extends UniteChanged<ReturnType<typeof ESHumanPoi.createDefaultProps>> {
}
