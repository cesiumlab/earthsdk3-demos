import { ESCameraVisibleRange, ESJEditingBindModeType } from "earthsdk3";
import { CzmCustomPrimitive, CzmESObjectWithLocation, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESCameraVisibleRange extends CzmESObjectWithLocation<ESCameraVisibleRange> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmESCustomPrimitive;
    get czmESCustomPrimitive(): CzmCustomPrimitive | undefined;
    private _czmTexture;
    get czmTexture(): CzmTexture | undefined;
    constructor(sceneObject: ESCameraVisibleRange, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
