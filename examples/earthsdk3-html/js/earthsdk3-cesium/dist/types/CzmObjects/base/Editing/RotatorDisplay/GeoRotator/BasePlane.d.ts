import * as Cesium from 'cesium';
import { GeoRotator } from '.';
import { HasOwner } from 'xbsj-base';
export declare class BasePlane extends HasOwner<GeoRotator> {
    get viewer(): Cesium.Viewer;
    get scene(): Cesium.Scene;
    get sceneObject(): GeoRotator;
    protected _valid: boolean;
    get valid(): boolean;
    protected _normal: Cesium.Cartesian3;
    get normal(): Cesium.Cartesian3 | undefined;
    protected _origin: Cesium.Cartesian3;
    get origin(): false | Cesium.Cartesian3;
    constructor(czmGeoRotator: GeoRotator);
    pick(windowPos: [number, number]): Cesium.Cartesian3 | undefined;
}
