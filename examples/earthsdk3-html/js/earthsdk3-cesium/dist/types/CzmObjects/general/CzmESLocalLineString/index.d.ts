import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { ESLocalLineString, ESLocalLineStringZ } from "../../../ESObjects";
export declare class CzmESLocalLineString extends CzmESObjectWithLocation<ESLocalLineString> {
    static readonly type: void;
    private _czmESLocalLineStringZ;
    get czmESLocalLineStringZ(): ESLocalLineStringZ;
    constructor(sceneObject: ESLocalLineString, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
