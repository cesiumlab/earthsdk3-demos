import { ESGeoVector } from "earthsdk3";
import { CzmESVisualObject } from "./CzmESVisualObject";
import { ESCesiumViewer } from "../../ESCesiumViewer";
export declare class CzmESGeoVector<T extends ESGeoVector = ESGeoVector> extends CzmESVisualObject<T> {
    updateEditing(): void;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
}
