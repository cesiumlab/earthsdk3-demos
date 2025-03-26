import { ESLocalSkyBox } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable } from "xbsj-base";
import { SkyBoxComponent } from "./SkyBoxComponent";
export declare class SkyBoxCameraListener extends Destroyable {
    constructor(sceneObject: ESLocalSkyBox, czmViewer: ESCesiumViewer, SkyBoxComponents: SkyBoxComponent[]);
}
