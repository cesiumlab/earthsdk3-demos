import { ESPolygonWithHole } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESGeoPolygon } from '../UeESGeoPolygon';
export declare class UeESPolygonWithHole extends UeESGeoPolygon<ESPolygonWithHole> {
    static readonly type: void;
    constructor(sceneObject: ESPolygonWithHole, ueViewer: ESUeViewer);
}
