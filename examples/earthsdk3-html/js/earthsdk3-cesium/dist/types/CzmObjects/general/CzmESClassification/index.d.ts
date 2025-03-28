import { ESClassification, ESJEditingBindModeType } from "earthsdk3";
import { CzmESGeoVector } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoClassificationPolygon } from "./GeoClassificationPolygon";
export declare class CzmESClassification extends CzmESGeoVector<ESClassification> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _polygon;
    get polygon(): GeoClassificationPolygon;
    constructor(sceneObject: ESClassification, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
