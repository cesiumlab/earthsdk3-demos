import { ESCameraVisibleRange } from "earthsdk3";
import { CzmCustomPrimitive, CzmESObjectWithLocation, CzmTexture, RayEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESCameraVisibleRange extends CzmESObjectWithLocation<ESCameraVisibleRange> {
    static readonly type: void;
    private _czmESCustomPrimitive;
    get czmESCustomPrimitive(): CzmCustomPrimitive | undefined;
    private _czmTexture;
    get czmTexture(): CzmTexture | undefined;
    private _innerPositionReact;
    private _innerRotationReact;
    private _rayEditing;
    get rayEditing(): RayEditing;
    constructor(sceneObject: ESCameraVisibleRange, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
