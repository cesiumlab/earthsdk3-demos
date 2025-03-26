import { ESDataMesh } from "earthsdk3";
import { CzmCustomPrimitive, CzmESObjectWithLocation, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export type CzmESDataMeshBuffers = {
    indexBuffer: Uint16Array;
    vertexBuffer: Float32Array;
    propBuffers: Float32Array[];
};
export declare class CzmESDataMesh extends CzmESObjectWithLocation<ESDataMesh> {
    static readonly type: void;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    private _czmTexture;
    get czmTexture(): CzmTexture;
    constructor(sceneObject: ESDataMesh, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
