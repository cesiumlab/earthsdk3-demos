import { ESPit } from "earthsdk3";
import { CzmCustomPrimitive, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmESGeoPolygon } from "../CzmESGeoPolygon";
export declare class CzmESPit extends CzmESGeoPolygon<ESPit> {
    static readonly type: void;
    czmSideCustomPrimitive: CzmCustomPrimitive | undefined;
    czmBottomCustomPrimitive: CzmCustomPrimitive | undefined;
    czmSideTexture: CzmTexture | undefined;
    czmBottomTexture: CzmTexture | undefined;
    private _width;
    private _height;
    constructor(sceneObject: ESPit, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    private _interpolationAlongPolygon;
    private _interpolationAlongLine;
    private _isClockwise;
    private _triangleIndices;
    private _getDistance;
}
