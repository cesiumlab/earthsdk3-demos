import { CzmESGeoLineString } from '../CzmESGeoLineString';
import { ESPipeline } from "earthsdk3";
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { CzmCustomPrimitive, CzmTexture } from "../../../CzmObjects";
export declare class CzmESPipeline extends CzmESGeoLineString<ESPipeline> {
    static readonly type: void;
    czmCustomPrimitive: CzmCustomPrimitive | undefined;
    czmTexture: CzmTexture | undefined;
    constructor(sceneObject: ESPipeline, czmViewer: ESCesiumViewer);
}
