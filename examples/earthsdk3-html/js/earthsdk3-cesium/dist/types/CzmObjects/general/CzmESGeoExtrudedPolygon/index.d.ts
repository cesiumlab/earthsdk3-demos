import { ESGeoExtrudedPolygon, ESGeoLineString } from "earthsdk3";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import * as Cesium from 'cesium';
export declare class CzmESGeoExtrudedPolygon<T extends ESGeoExtrudedPolygon = ESGeoExtrudedPolygon> extends CzmESGeoPolygon<T> {
    static readonly type: void;
    czmEntity?: Cesium.Entity;
    czmPolyline: ESGeoLineString;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    getMinAndMaxheight(): number[];
}
