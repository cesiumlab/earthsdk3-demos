import { JsonValue, UniteChanged } from "xbsj-base";
import { ESJFillStyle, ESJPointStyle, ESJRenderType, ESJStrokeStyle, ESJVector3D, ESJVector3DArray } from "../../ESJTypes";
import { ESVisualObject } from "./ESVisualObject";
/**
 * https://www.wolai.com/earthsdk/u1Uc89HHrBjiGGB67BdFLc
 */
export declare abstract class ESGeoVector extends ESVisualObject {
    private _editing;
    get editing(): boolean;
    set editing(value: boolean);
    get editingChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    protected _area: import("xbsj-base").ReactiveVariable<number>;
    get area(): number;
    get areaChanged(): import("xbsj-base").Listener<[number, number]>;
    protected _perimeter: import("xbsj-base").ReactiveVariable<number>;
    get perimeter(): number;
    get perimeterChanged(): import("xbsj-base").Listener<[number, number]>;
    protected _updateArea(): void;
    protected _updatePerimeter(): void;
    constructor(id?: string);
    getArea(): number | undefined;
    getDistance(): number | undefined;
    getPerimeter(): number | undefined;
    getIntersect(position: ESJVector3DArray): ESJVector3DArray[] | undefined;
    getUnion(position: ESJVector3DArray): ESJVector3DArray[] | undefined;
    /**
     * 裁切
     * @param positions 用来裁切多边形的多边形
     * @returns 如果返回对象自身的positions,表示用来裁切的多边形完全包含在对象多边形之中，裁切出来中空的多边形需要自行处理；
     * 其他情况正常返回多边形值。
     */
    getDifference(position: [number, number, number][]): {
        status: string;
        positions: any;
    };
    getBuffer(radius?: number, units?: string): ESJVector3D[][] | undefined;
    geoPolygonOverlap(position: ESJVector3DArray): boolean | undefined;
    static defaults: {
        points: ESJVector3DArray;
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
        defaultMenu: string;
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
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
export declare namespace ESGeoVector {
    const createDefaultProps: () => {
        pointed: boolean;
        pointStyle: import("xbsj-base").ReactiveVariable<ESJPointStyle>;
        stroked: boolean;
        strokeStyle: import("xbsj-base").ReactiveVariable<ESJStrokeStyle>;
        filled: boolean;
        fillStyle: import("xbsj-base").ReactiveVariable<ESJFillStyle>;
        points: import("xbsj-base").ReactiveVariable<[number, number, number][] | undefined>;
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
export interface ESGeoVector extends UniteChanged<ReturnType<typeof ESGeoVector.createDefaultProps>> {
}
