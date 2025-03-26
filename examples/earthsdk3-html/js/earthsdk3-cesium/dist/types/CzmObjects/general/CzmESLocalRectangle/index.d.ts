import { ESLocalPolygon, ESLocalRectangle } from "earthsdk3";
import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESLocalRectangle extends CzmESObjectWithLocation<ESLocalRectangle> {
    static readonly type: void;
    private _czmLocalRectangle;
    get czmLocalRectangle(): ESLocalPolygon;
    constructor(sceneObject: ESLocalRectangle, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
