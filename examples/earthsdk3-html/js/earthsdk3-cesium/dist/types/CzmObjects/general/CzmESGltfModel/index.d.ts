import { ESGltfModel } from "earthsdk3";
import { CzmESObjectWithLocation, CzmModelPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESGltfModel<T extends ESGltfModel = ESGltfModel> extends CzmESObjectWithLocation<T> {
    static readonly type: void;
    private _czmModel;
    get model(): CzmModelPrimitive | undefined;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
