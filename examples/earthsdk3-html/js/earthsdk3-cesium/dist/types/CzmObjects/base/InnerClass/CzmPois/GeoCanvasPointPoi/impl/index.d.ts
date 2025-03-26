import { Destroyable, Listener } from 'xbsj-base';
import { GeoCanvasPointPoi } from '../index';
import { CanvasPointPoi } from './CanvasPointPoi';
export declare class GeoCanvasPointPoiImpl extends Destroyable {
    constructor(sceneObject: GeoCanvasPointPoi, canvasPointPoi: CanvasPointPoi, visibleAlphaChanged?: Listener<[number, number]>);
}
