import { ESJVector3DArray, ESPit } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
export declare class CzmESPit extends CzmESGeoPolygon<ESPit> {
    static readonly type: void;
    private _judgePoints;
    get judgePoints(): ESJVector3DArray;
    set judgePoints(value: ESJVector3DArray);
    get judgePointsChanged(): import("xbsj-base").Listener<[ESJVector3DArray, ESJVector3DArray]>;
    constructor(sceneObject: ESPit, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
