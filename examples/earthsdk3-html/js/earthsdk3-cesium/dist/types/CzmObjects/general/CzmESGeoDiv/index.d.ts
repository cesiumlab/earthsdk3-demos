import { ESGeoDiv } from "earthsdk3";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { CzmESObjectWithLocation, GeoCustomDivPoi } from "../../../CzmObjects";
/**
 * https://www.wolai.com/earthsdk/e17QPxZkVnG3ujXj8sJ2un
 */
export declare class CzmESGeoDiv extends CzmESObjectWithLocation<ESGeoDiv> {
    static readonly type: void;
    private _czmGeoCustomDivPoi;
    get czmGeoCustomDivPoi(): GeoCustomDivPoi<{
        destroy(): undefined;
    }>;
    private _divContainer;
    private _hasClassDivAndPos;
    constructor(sceneObject: ESGeoDiv, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
