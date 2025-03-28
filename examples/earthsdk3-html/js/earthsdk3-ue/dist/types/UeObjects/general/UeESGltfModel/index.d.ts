import { ESGltfModel, ESJResource } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESObjectWithLocation } from "../../../UeObjects";
export declare class UeESGltfModel<T extends ESGltfModel = ESGltfModel> extends UeESObjectWithLocation<T> {
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        url: (val: string | ESJResource) => string | ESJResource;
        czmMaximumScale: null;
        czmMinimumPixelSize: null;
        czmNativeScale: null;
        czmColor: null;
    };
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
