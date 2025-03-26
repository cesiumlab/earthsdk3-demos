import { ESLocalVector } from "earthsdk3";
import { CzmESObjectWithLocation } from "./CzmESObjectWithLocation";
import { ESCesiumViewer } from "../../ESCesiumViewer";
export declare class CzmESLocalVector<T extends ESLocalVector = ESLocalVector> extends CzmESObjectWithLocation<T> {
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
}
