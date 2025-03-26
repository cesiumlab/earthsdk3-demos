import { ESLocalSkyBox } from "earthsdk3";
import { CzmCustomPrimitive, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
export declare class SkyBoxComponent extends Destroyable {
    private _sceneObject;
    private _show;
    get show(): boolean;
    set show(value: boolean);
    get showChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _czmESCustomPrimitive;
    get czmESCustomPrimitive(): CzmCustomPrimitive;
    private _czmTexture;
    get czmTexture(): CzmTexture;
    constructor(_sceneObject: ESLocalSkyBox, czmViewer: ESCesiumViewer, imagePosition: string, positionMatrix: number[][]);
    changeOpacity(OpacityFactor: number): void;
}
