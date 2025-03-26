import { Czm3DTiles } from './Czm3DTiles';
import { ES3DTileset } from "earthsdk3";
import { CzmESVisualObject } from '../../base';
import { CzmFlattenedPlane } from '../CzmESPolygonFlattenedPlane';
import { CzmClippingPlanes } from '../CzmESClippingPlane';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
export * from './Czm3DTiles';
export declare class CzmES3DTileset<T extends ES3DTileset = ES3DTileset> extends CzmESVisualObject<T> {
    static readonly type: void;
    private _czm3DTiles;
    get czm3DTiles(): Czm3DTiles;
    private _clippingPlanes;
    get clippingPlanes(): CzmClippingPlanes;
    private _flattenedPlane;
    get flattenedPlane(): CzmFlattenedPlane;
    private _styleColor;
    get styleColor(): [string, string][] | undefined;
    set styleColor(value: [string, string][] | undefined);
    private _highlightStyleColor;
    get highlightStyleColor(): [string, string] | undefined;
    set highlightStyleColor(value: [string, string] | undefined);
    private _styleVisable;
    get styleVisable(): [string, string][] | undefined;
    set styleVisable(value: [string, string][] | undefined);
    highlightFeature(id: string | number, color?: string): void;
    /**
     * 注意：先恢复成初始样式再设置
     * 1.反转来避免区间重复判断不生效问题
     * 2.组织成conditions数组
     * 3.组织成json设置styleJson
     */
    setFeatureColor(conditionss: [string, string][]): void;
    setFeatureVisable(conditionss: [string, string][]): void;
    resetFeatureStyle(): void;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
