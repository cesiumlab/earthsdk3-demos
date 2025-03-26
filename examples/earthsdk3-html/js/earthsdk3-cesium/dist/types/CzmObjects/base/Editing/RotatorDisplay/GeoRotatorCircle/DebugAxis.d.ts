import { HasOwner } from 'xbsj-base';
import { GeoRotatorCircle } from '.';
import { CzmCustomPrimitive } from '../../../../../CzmObjects';
export declare class DebugAxis extends HasOwner<GeoRotatorCircle> {
    private _axis;
    get axis(): CzmCustomPrimitive;
    private _axisInit;
    constructor(owner: GeoRotatorCircle);
}
