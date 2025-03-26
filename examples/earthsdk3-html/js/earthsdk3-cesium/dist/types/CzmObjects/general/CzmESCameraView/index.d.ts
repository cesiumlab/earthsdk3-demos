import { ESCameraView } from "earthsdk3";
import { CzmESObjectWithLocation, CzmView } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESCameraView extends CzmESObjectWithLocation<ESCameraView> {
    static readonly type: void;
    private _view;
    get view(): CzmView;
    constructor(sceneObject: ESCameraView, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
