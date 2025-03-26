import { ESCesiumViewer } from "../../ESCesiumViewer";
import { ESObjectWithLocation } from "earthsdk3";
import { CzmESVisualObject } from "./CzmESVisualObject";
import { CzmESPrsEditing } from "./Editing";
export declare class CzmESObjectWithLocation<T extends ESObjectWithLocation = ESObjectWithLocation> extends CzmESVisualObject<T> {
    private _sPrsEditing;
    get sPrsEditing(): CzmESPrsEditing;
    private _smoothMoving;
    smoothMove(P: [number, number, number], T: number): void;
    smoothMoveWithRotation(P: [number, number, number], R: [number, number, number], T: number): void;
    smoothMoveOnGround(Lon: number, Lat: number, T: number): void;
    smoothMoveWithRotationOnGround(R: [number, number, number], Lon: number, Lat: number, T: number): void;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
