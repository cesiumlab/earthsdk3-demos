import { UniteChanged } from "xbsj-base";
import { ESLocalVector } from "./ESLocalVector";
export declare abstract class ESLocalVector2D extends ESLocalVector {
    static defaults: {
        pointStyle: import("../..").ESJPointStyle;
        strokeStyle: import("../..").ESJStrokeStyle;
        fillStyle: import("../..").ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../..").ESJFlyToParam;
        flyInParam: import("../..").ESJFlyInParam;
    };
    getESProperties(): {
        style: import("../..").Property[];
        defaultMenu: string;
        location: import("../..").Property[];
        general: import("../..").Property[];
        basic: import("../..").Property[];
        dataSource: import("../..").Property[];
        coordinate: import("../..").Property[];
    };
    getProperties(language?: string): import("../..").Property[];
}
export declare namespace ESLocalVector2D {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<import("../..").ESJFillStyle>;
        position: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        rotation: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        scale: import("xbsj-base").ReactiveVariable<import("../..").ESJVector3D>;
        minVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        maxVisibleDistance: import("xbsj-base").ReactiveVariable<number>;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<import("../..").ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESLocalVector2D extends UniteChanged<ReturnType<typeof ESLocalVector2D.createDefaultProps>> {
}
