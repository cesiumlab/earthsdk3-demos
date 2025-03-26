import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from "./index";
import { CzmGlobeMaterial } from "../CzmObjects";
export declare class TerrainShader extends Destroyable {
    private _czmViewer;
    private _czmGlobeMaterial;
    get czmGlobeMaterial(): CzmGlobeMaterial;
    constructor(_czmViewer: ESCesiumViewer);
}
