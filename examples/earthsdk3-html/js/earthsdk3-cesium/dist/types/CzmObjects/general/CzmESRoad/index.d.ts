import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESRoad } from "../../../ESObjects";
import { CzmRoad } from "./CzmRoad";
export declare class CzmESRoad extends CzmESVisualObject<ESRoad> {
    static readonly type: void;
    private _czmESRoad;
    get czmESRoad(): CzmRoad;
    constructor(sceneObject: ESRoad, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
