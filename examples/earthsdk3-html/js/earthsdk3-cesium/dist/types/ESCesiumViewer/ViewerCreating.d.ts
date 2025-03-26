import * as Cesium from 'cesium';
import { Destroyable, JsonValue } from 'xbsj-base';
import { ESCesiumViewer } from './index';
import './initCesiumViewer';
export declare class ViewerCreating extends Destroyable {
    constructor(subContainer: HTMLDivElement, czmViewer: ESCesiumViewer, setViewerFunc: (viewer: Cesium.Viewer | undefined) => void, czmOptions?: JsonValue);
}
