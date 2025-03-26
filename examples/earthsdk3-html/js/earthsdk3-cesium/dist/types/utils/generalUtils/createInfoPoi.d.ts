import { GeoCustomDivPoi } from '../../CzmObjects';
import { ESCesiumViewer } from '../../ESCesiumViewer';
import { SceneObjectKey } from 'xbsj-base';
export declare function createInfoPoi(text: string, position: [number, number, number], czmViewer: ESCesiumViewer, id?: SceneObjectKey): GeoCustomDivPoi<{
    destroy(): undefined;
}>;
