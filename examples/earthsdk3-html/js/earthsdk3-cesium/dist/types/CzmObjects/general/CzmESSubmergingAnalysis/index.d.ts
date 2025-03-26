import { ESSubmergingAnalysis } from "earthsdk3";
import { CzmCustomPrimitive, CzmESObjectWithLocation, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { WaterAttributeType } from "../../../ESJTypesCzm";
export declare const waterType: {
    [xx: string]: WaterAttributeType;
};
export declare class CzmESSubmergingAnalysis extends CzmESObjectWithLocation<ESSubmergingAnalysis> {
    static readonly type: void;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    private _causticsTexture;
    get causticsTexture(): CzmTexture;
    private _foamTexture;
    get foamTexture(): CzmTexture;
    private _heightMapTexture;
    get heightMapTexture(): CzmTexture;
    private _normalMapTexture;
    get normalMapTexture(): CzmTexture;
    constructor(sceneObject: ESSubmergingAnalysis, czmViewer: ESCesiumViewer);
    private isTimestamp;
    private getClosestTimestampIndex;
    flyTo(duration: number | undefined, id: number): boolean;
    private updateWater;
}
