import { ESEntityCluster } from "earthsdk3";
import { CzmESVisualObject } from '../../base';
import { ESCesiumViewer } from '../../../ESCesiumViewer';
export declare class CzmESEntityCluster extends CzmESVisualObject<ESEntityCluster> {
    static readonly type: void;
    private _scaleFactor;
    private _urlData;
    get urlData(): any;
    set urlData(value: any);
    get urlDataChanged(): import("xbsj-base").Listener<[any, any]>;
    private _dataSource;
    private _clusterImages;
    private _clusterImageAttribute;
    private _clusterImageUrl;
    constructor(sceneObject: ESEntityCluster, czmViewer: ESCesiumViewer);
    private updateEntityCluster;
    private updateStyle;
    private getClusterStyle;
    private _addEntities;
    private _getPositionLLH;
}
