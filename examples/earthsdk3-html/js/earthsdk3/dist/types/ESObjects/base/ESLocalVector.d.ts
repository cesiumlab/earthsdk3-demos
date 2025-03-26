import { JsonValue, UniteChanged } from "xbsj-base";
import { ESJFillStyle, ESJPointStyle, ESJRenderType, ESJStrokeStyle } from "../../ESJTypes";
import { ESObjectWithLocation } from "./ESObjectWithLocation";
/**
 * https://www.wolai.com/earthsdk/8ZYnmuDDkpCLCGrvtFyuDv
 */
export declare abstract class ESLocalVector extends ESObjectWithLocation {
    static defaults: {
        pointStyle: ESJPointStyle;
        strokeStyle: ESJStrokeStyle;
        fillStyle: ESJFillStyle;
        pointed: boolean;
        stroked: boolean;
        filled: boolean;
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("../../ESJTypes").ESJFlyToParam;
        flyInParam: import("../../ESJTypes").ESJFlyInParam;
    };
    getESProperties(): {
        style: import("../../ESJTypes").Property[];
        defaultMenu: string;
        location: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
    get pointSize(): number;
    set pointSize(value: number);
    get pointSizeChanged(): import("xbsj-base").Listener<[ESJPointStyle, ESJPointStyle]>;
    get pointSizeType(): ESJRenderType;
    set pointSizeType(value: ESJRenderType);
    get pointSizeTypeChanged(): import("xbsj-base").Listener<[ESJPointStyle, ESJPointStyle]>;
    get pointColor(): [number, number, number, number];
    set pointColor(value: [number, number, number, number]);
    get pointColorChanged(): import("xbsj-base").Listener<[ESJPointStyle, ESJPointStyle]>;
    get pointMaterial(): string;
    set pointMaterial(value: string);
    get pointMaterialChanged(): import("xbsj-base").Listener<[ESJPointStyle, ESJPointStyle]>;
    get pointMaterialParams(): JsonValue;
    set pointMaterialParams(value: JsonValue);
    get pointMaterialParamsChanged(): import("xbsj-base").Listener<[ESJPointStyle, ESJPointStyle]>;
    get strokeWidth(): number;
    set strokeWidth(value: number);
    get strokeWidthChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeWidthType(): ESJRenderType;
    set strokeWidthType(value: ESJRenderType);
    get strokeWidthTypeChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeColor(): [number, number, number, number];
    set strokeColor(value: [number, number, number, number]);
    get strokeColorChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeMaterial(): string;
    set strokeMaterial(value: string);
    get strokeMaterialChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeMaterialParams(): JsonValue;
    set strokeMaterialParams(value: JsonValue);
    get strokeMaterialParamsChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get strokeGround(): boolean;
    set strokeGround(value: boolean);
    get strokeGroundChanged(): import("xbsj-base").Listener<[ESJStrokeStyle, ESJStrokeStyle]>;
    get fillColor(): [number, number, number, number];
    set fillColor(value: [number, number, number, number]);
    get fillColorChanged(): import("xbsj-base").Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillMaterial(): string;
    set fillMaterial(value: string);
    get fillMaterialChanged(): import("xbsj-base").Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillMaterialParams(): JsonValue | undefined;
    set fillMaterialParams(value: JsonValue | undefined);
    get fillMaterialParamsChanged(): import("xbsj-base").Listener<[ESJFillStyle, ESJFillStyle]>;
    get fillGround(): boolean;
    set fillGround(value: boolean);
    get fillGroundChanged(): import("xbsj-base").Listener<[ESJFillStyle, ESJFillStyle]>;
}
export declare namespace ESLocalVector {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
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
        extras: import("xbsj-base").ReactiveVariable<JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESLocalVector extends UniteChanged<ReturnType<typeof ESLocalVector.createDefaultProps>> {
}
