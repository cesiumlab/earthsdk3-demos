import { ESPipeFence } from "earthsdk3";
import { CzmCustomPrimitive, CzmESGeoVector, CzmPolyline, CzmTexture } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESPipeFence<T extends ESPipeFence = ESPipeFence> extends CzmESGeoVector<T> {
    static readonly type: void;
    private _line;
    get line(): CzmPolyline;
    private _czmTexture;
    czmTexture(): CzmTexture;
    private _czmCustomPrimitive;
    get czmCustomPrimitive(): CzmCustomPrimitive;
    private _distances;
    get distances(): number;
    set distances(value: number);
    get distancesChanged(): import("xbsj-base").Listener<[number, number]>;
    computeBoundingBox(): void;
    bindCustomPrimitive(sceneObject: ESPipeFence): CzmCustomPrimitive;
    constructor(sceneObject: T, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
