import * as Cesium from 'cesium';
import { HasOwner, Listener, ObjResetting } from 'xbsj-base';
import { GeoRotator } from '.';
import { Rotating } from './Rotating';
import { RotatorStartInfoType } from './RotatorStartInfoType';
import { RotatorPlaneType } from './RotatorPlaneType';
export declare class RotatorRunning extends HasOwner<GeoRotator> {
    private _rotatingResetting;
    get rotatingResetting(): ObjResetting<Rotating, Listener<[startInfo: RotatorStartInfoType | undefined]>>;
    constructor(owner: GeoRotator);
    pickPlane(startInfo: RotatorStartInfoType, scene: Cesium.Scene, type: Exclude<RotatorPlaneType, 'none'>, windowPos: [number, number], sceneScale: number): void;
    getStartInfo(pointerEvent: PointerEvent): RotatorStartInfoType | undefined;
}
