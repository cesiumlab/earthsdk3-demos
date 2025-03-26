import { ESRectangle } from "earthsdk3";
import { CzmESVisualObject, CzmRectangle } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESRectangle extends CzmESVisualObject<ESRectangle> {
    static readonly type: void;
    private _czmESRectangle;
    get czmESRectangle(): CzmRectangle;
    constructor(sceneObject: ESRectangle, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
