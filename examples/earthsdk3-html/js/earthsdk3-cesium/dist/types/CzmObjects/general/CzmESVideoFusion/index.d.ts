import { ESVideoFusion } from "earthsdk3";
import { CzmESObjectWithLocation, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmCameraVideo } from "./CzmESVideoFusionImpl";
export declare class CzmESVideoFusion extends CzmESObjectWithLocation<ESVideoFusion> {
    static readonly type: void;
    private _czmCameraVideo;
    get czmCameraVideo(): CzmCameraVideo;
    private _czmTexture;
    get czmTexture(): CzmTexture;
    constructor(sceneObject: ESVideoFusion, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
