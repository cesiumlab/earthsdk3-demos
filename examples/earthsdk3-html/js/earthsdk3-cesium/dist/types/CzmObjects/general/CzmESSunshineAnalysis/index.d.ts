import { ESSunshineAnalysis } from "earthsdk3";
import { CzmPointPrimitiveCollection } from '../../../CzmObjects';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
import { CzmESGeoPolygon } from '../CzmESGeoPolygon';
export declare class CzmESSunshineAnalysis extends CzmESGeoPolygon<ESSunshineAnalysis> {
    static readonly type: void;
    czmPointPrimitiveCollection: CzmPointPrimitiveCollection | undefined;
    private _stopRun;
    constructor(sceneObject: ESSunshineAnalysis, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
