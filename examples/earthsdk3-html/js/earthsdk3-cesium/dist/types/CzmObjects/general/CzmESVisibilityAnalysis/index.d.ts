import * as Cesium from 'cesium';
import { CzmESGeoVector, CzmPolylinesPrimitive, PositionsEditing } from '../../../CzmObjects';
import { ESJVector3D, ESVisibilityAnalysis } from "earthsdk3";
import { ESCesiumViewer } from '../../../ESCesiumViewer';
/**
 * 计算切割点
 * @param p1 起始点
 * @param p2 结束点
 * @param scene Cesium场景
 * @returns {ESJVector3D|undefined} 切割点
 */
export declare function computeCutPoint(p1: ESJVector3D, p2: ESJVector3D, scene: Cesium.Scene): ESJVector3D | undefined;
export declare class CzmESVisibilityAnalysis extends CzmESGeoVector<ESVisibilityAnalysis> {
    static readonly type: void;
    private _hideGeoPolylines;
    get hideGeoPolylines(): CzmPolylinesPrimitive;
    private _visibleGeoPolylines;
    get visibleGeoPolylines(): CzmPolylinesPrimitive;
    private _sPositionsEditing;
    get sPositionsEditing(): PositionsEditing;
    constructor(sceneObject: ESVisibilityAnalysis, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
