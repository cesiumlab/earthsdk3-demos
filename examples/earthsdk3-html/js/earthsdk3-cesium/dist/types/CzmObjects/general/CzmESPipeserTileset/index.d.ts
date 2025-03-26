import { ESPipeserTileset } from "earthsdk3";
import { CzmES3DTileset } from "../CzmES3DTileset";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESPipeserTileset extends CzmES3DTileset<ESPipeserTileset> {
    static readonly type: void;
    constructor(sceneObject: ESPipeserTileset, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
