import { ESDynamicWater } from "earthsdk3";
import { CzmESLocalVector, CzmPolyline, CzmWater } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
/**
 * https://www.wolai.com/earthsdk/f9Kycrmp1srzt2dJyzgUxr
 */
export declare class CzmESDynamicWater extends CzmESLocalVector<ESDynamicWater> {
    static readonly type: void;
    czmGeoPolyline: CzmPolyline | undefined;
    czmWater: CzmWater | undefined;
    constructor(sceneObject: ESDynamicWater, czmViewer: ESCesiumViewer);
    visibleDistance(sceneObject: ESDynamicWater, czmViewer: ESCesiumViewer): void;
    flyTo(duration: number | undefined, id: number): boolean;
    private updateWater;
}
