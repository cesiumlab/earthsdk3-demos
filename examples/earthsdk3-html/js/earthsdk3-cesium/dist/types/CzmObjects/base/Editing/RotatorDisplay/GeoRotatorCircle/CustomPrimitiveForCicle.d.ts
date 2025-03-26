import { CzmCustomPrimitive } from '../../.././../../CzmObjects';
import { GeoRotatorCircle } from '.';
import { HasOwner } from 'xbsj-base';
import { ESCesiumViewer } from '../../../../../ESCesiumViewer';
export declare function createCustomPrimitive(czmViewer: ESCesiumViewer): CzmCustomPrimitive;
export declare class CustomPrimitiveForCircle extends HasOwner<GeoRotatorCircle> {
    get sceneObject(): GeoRotatorCircle;
    get czmTexture(): import("../../../InnerClass/CzmTexture").CzmTexture;
    get czmViewer(): ESCesiumViewer;
    private _customPrimitive;
    get customPrimitive(): CzmCustomPrimitive;
    constructor(owner: GeoRotatorCircle);
}
