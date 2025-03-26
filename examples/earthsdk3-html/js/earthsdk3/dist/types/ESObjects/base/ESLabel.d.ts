import { ESJVector2D, ESJWidgetEventInfo } from "../../ESJTypes";
import { Event, UniteChanged } from "xbsj-base";
import { ESObjectWithLocation } from "./ESObjectWithLocation";
export declare abstract class ESLabel extends ESObjectWithLocation {
    private _widgetEvent;
    get widgetEvent(): Event<[ESJWidgetEventInfo]>;
    static defaults: {
        screenRender: boolean;
        size: ESJVector2D;
        anchor: ESJVector2D;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
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
export declare namespace ESLabel {
    const createDefaultProps: () => {
        screenRender: boolean;
        size: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        anchor: import("xbsj-base").ReactiveVariable<ESJVector2D>;
        offset: import("xbsj-base").ReactiveVariable<[number, number]>;
        sizeByContent: boolean;
        renderMode: number;
        rotationType: number;
        zOrder: number;
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
export interface ESLabel extends UniteChanged<ReturnType<typeof ESLabel.createDefaultProps>> {
}
