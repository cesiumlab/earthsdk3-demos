import { ESGeoLineString } from "earthsdk3";
import { ESUeViewer } from '../../../ESUeViewer';
import { UeESGeoVector } from '../../base';
export declare class UeESGeoLineString<T extends ESGeoLineString = ESGeoLineString> extends UeESGeoVector<T> {
    static readonly type: void;
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
