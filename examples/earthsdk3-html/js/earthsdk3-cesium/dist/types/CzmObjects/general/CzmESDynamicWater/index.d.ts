import { ESDynamicWater } from "earthsdk3";
import { CzmESLocalVector, CzmPolyline, CzmWaterPrimitive } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
/**
 * https://www.wolai.com/earthsdk/f9Kycrmp1srzt2dJyzgUxr
 */
export declare class CzmESDynamicWater extends CzmESLocalVector<ESDynamicWater> {
    static readonly type: void;
    czmGeoPolyline: CzmPolyline | undefined;
    czmWaterPrimitive: CzmWaterPrimitive | undefined;
    constructor(sceneObject: ESDynamicWater, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    private updateWater;
}
