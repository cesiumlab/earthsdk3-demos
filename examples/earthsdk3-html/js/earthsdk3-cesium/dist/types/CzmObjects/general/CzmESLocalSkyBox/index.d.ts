import { ESLocalSkyBox } from "earthsdk3";
import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalSkyBox extends CzmESObjectWithLocation<ESLocalSkyBox> {
    static readonly type: void;
    private static _defaultLocalBox;
    private static _firstLoad;
    private static _eSLocalSkyBoxArr;
    private _czmSkyBoxComponents;
    constructor(sceneObject: ESLocalSkyBox, czmViewer: ESCesiumViewer);
    ChangeAutoFollow(): void;
    flyTo(duration: number | undefined, id: number): boolean;
}
