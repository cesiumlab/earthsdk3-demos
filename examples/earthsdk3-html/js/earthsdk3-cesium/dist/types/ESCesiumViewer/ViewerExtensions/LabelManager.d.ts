import { GeoCanvasPoi, GeoCustomDivPoi } from "../../CzmObjects";
import { Destroyable } from "xbsj-base";
import * as Cesium from 'cesium';
export declare class LabelManager extends Destroyable {
    private _viewer;
    private _labelMap;
    constructor(_viewer: Cesium.Viewer);
    add(poi: GeoCustomDivPoi | GeoCanvasPoi): void;
    delete(poi: GeoCustomDivPoi | GeoCanvasPoi): void;
    private _updateZOrder;
    private _updateLabelZOrder;
}
