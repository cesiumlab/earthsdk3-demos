import { ESOlViewer } from '../../ESOlViewer';
import { EngineObject } from 'earthsdk3';
import { ESXYZLayer } from './ESXYZLayer';
export declare class ESOlXYZLayer extends EngineObject<ESXYZLayer> {
    static readonly type: void;
    constructor(sceneObject: ESXYZLayer, olViewer: ESOlViewer);
}
