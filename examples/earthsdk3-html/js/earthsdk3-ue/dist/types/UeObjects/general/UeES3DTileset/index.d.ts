import { EngineObject, ES3DTileset, FeatureColorJsonType, FeatureVisableJsonType } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeES3DTileset<T extends ES3DTileset = ES3DTileset> extends EngineObject<T> {
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
    private _styleColor;
    get styleColor(): FeatureColorJsonType[];
    set styleColor(value: FeatureColorJsonType[]);
    private _styleVisable;
    get styleVisable(): FeatureVisableJsonType[];
    set styleVisable(value: FeatureVisableJsonType[]);
}
