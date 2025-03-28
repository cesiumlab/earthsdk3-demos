import { ES3DTileset, ESRtsFeatureEditing } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESSceneObject } from "../../../UeObjects/base";
export declare class UeESRtsFeatureEditing<T extends ESRtsFeatureEditing = ESRtsFeatureEditing> extends UeESSceneObject<T> {
    static readonly type: void;
    static combinationClass: boolean;
    private _es3DTileset;
    get es3DTileset(): ES3DTileset;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
