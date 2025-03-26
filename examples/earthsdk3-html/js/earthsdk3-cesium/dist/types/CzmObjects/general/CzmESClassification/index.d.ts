import { ESClassification } from "earthsdk3";
import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoClassificationPolygon } from "./GeoClassificationPolygon";
export declare class CzmESClassification extends CzmESVisualObject<ESClassification> {
    static readonly type: void;
    private _polygon;
    get polygon(): GeoClassificationPolygon;
    constructor(sceneObject: ESClassification, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
