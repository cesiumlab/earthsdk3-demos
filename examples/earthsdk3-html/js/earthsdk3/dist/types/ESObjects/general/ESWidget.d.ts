import { ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
import { ESLabel } from "../base";
export type ESWidgetInfoType = {
    [xx: string]: any;
};
/**
 * https://www.wolai.com/earthsdk/79HfDhosrSfpcfTnvRryyG
 */
export declare class ESWidget extends ESLabel {
    static readonly type: string;
    get typeName(): string;
    get defaultProps(): {
        info: ESWidgetInfoType;
        widgetClass: string | undefined;
        actorTag: string;
        socketName: string;
        positionOffset: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        rotationOffset: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        opacity: number;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
        position: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
    static defaults: {
        info: ESWidgetInfoType;
        widgetClass: string;
        actorTag: string;
        socketName: string;
        positionOffset: [number, number, number];
        rotationOffset: [number, number, number];
        allowTextEditing: boolean;
        opacity: number;
        screenRender: boolean;
        size: import("./../../ESJTypes").ESJVector2D;
        anchor: import("./../../ESJTypes").ESJVector2D;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("./../../ESJTypes").ESJFlyToParam;
        flyInParam: import("./../../ESJTypes").ESJFlyInParam;
    };
    constructor(id?: SceneObjectKey);
    getESProperties(): {
        basic: import("./../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("./../../ESJTypes").Property[];
        general: import("./../../ESJTypes").Property[];
        dataSource: import("./../../ESJTypes").Property[];
        coordinate: import("./../../ESJTypes").Property[];
        style: import("./../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("./../../ESJTypes").Property[];
}
export declare namespace ESWidget {
    const createDefaultProps: () => {
        info: ESWidgetInfoType;
        widgetClass: string | undefined;
        actorTag: string;
        socketName: string;
        positionOffset: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        rotationOffset: import("xbsj-base").ReactiveVariable<[number, number, number]>;
        opacity: number;
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector2D>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
        position: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("./../../ESJTypes").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESWidget extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof ESWidget.createDefaultProps>> {
}
