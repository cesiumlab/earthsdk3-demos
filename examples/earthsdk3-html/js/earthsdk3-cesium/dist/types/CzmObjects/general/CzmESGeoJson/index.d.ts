import { ESGeoJson } from "earthsdk3";
import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGeoJson extends CzmESVisualObject<ESGeoJson> {
    static readonly type: void;
    constructor(sceneObject: ESGeoJson, czmViewer: ESCesiumViewer);
    _getFeatureByIndexOrProperties(keyOrIndex: string | number, value?: any): {
        type: any;
        positions: any;
    } | undefined;
    private _calculateFeatureHeight;
}
