import { ESCesiumViewer } from "../../ESCesiumViewer";
import { ESJEditingBindModeType, ESObjectWithLocation } from "earthsdk3";
import { CzmESVisualObject } from "./CzmESVisualObject";
export declare class CzmESObjectWithLocation<T extends ESObjectWithLocation = ESObjectWithLocation> extends CzmESVisualObject<T> {
    private _smoothMoving;
    editingBindMode: ESJEditingBindModeType;
    smoothMove(P: [number, number, number], T: number): void;
    smoothMoveWithRotation(P: [number, number, number], R: [number, number, number], T: number): void;
    smoothMoveOnGround(Lon: number, Lat: number, T: number): void;
    smoothMoveWithRotationOnGround(R: [number, number, number], Lon: number, Lat: number, T: number): void;
    updateEditing(): void;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    visibleDistance(sceneObject: T, czmViewer: ESCesiumViewer): void;
    static getInnerCzmObjects(czmObject: any): any[];
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
