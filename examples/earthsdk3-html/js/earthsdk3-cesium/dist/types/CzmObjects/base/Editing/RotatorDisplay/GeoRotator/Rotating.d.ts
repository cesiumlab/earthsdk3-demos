import { RotatorStartInfoType } from './RotatorStartInfoType';
import { GeoRotator } from '.';
import { RotatorRunning } from './RotatorRunning';
import { HasOwner } from 'xbsj-base';
export declare class Rotating extends HasOwner<RotatorRunning> {
    private _startInfo;
    get startInfo(): RotatorStartInfoType;
    get planeType(): "heading" | "pitch" | "roll";
    get czmGeoRotator(): GeoRotator;
    get plane(): import("./BasePlane").BasePlane;
    get circle(): import("..").GeoRotatorCircle;
    constructor(owner: RotatorRunning, _startInfo: RotatorStartInfoType);
    move(pointerEvent: PointerEvent, startInfo: RotatorStartInfoType): void;
}
