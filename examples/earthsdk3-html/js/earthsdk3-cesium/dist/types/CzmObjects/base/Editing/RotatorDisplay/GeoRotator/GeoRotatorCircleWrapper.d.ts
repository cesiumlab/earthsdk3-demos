import { HasOwner } from "xbsj-base";
import { GeoRotator } from ".";
import { GeoRotatorCircle } from "../GeoRotatorCircle";
import { RotatorPlaneType } from "./RotatorPlaneType";
export declare class GeoRotatorCircleWrapper extends HasOwner<GeoRotator> {
    private _type;
    get sceneObject(): GeoRotator;
    get czmViewer(): import("../../../../..").ESCesiumViewer;
    get type(): "heading" | "pitch" | "roll";
    private _circle;
    get circle(): GeoRotatorCircle;
    constructor(owner: GeoRotator, _type: Exclude<RotatorPlaneType, 'none'>);
}
