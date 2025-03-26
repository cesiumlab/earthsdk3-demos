import { EngineObject, ESGeoDiv } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESGeoDiv extends EngineObject<ESGeoDiv> {
    static readonly type: void;
    private _imageLabel;
    private _hasClassDivAndPos;
    constructor(sceneObject: ESGeoDiv, ueViewer: ESUeViewer);
}
