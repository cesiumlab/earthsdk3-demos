import { Destroyable } from "xbsj-base";
import { ESRtsTileset } from ".";
import { ES3DTileset } from "../ES3DTileset";
export declare class ESDSFeature extends Destroyable {
    private _featureId;
    private _inner3DTileset;
    get inner3DTileset(): ES3DTileset;
    set inner3DTileset(value: ES3DTileset);
    constructor(sceneObject: ESRtsTileset, _featureId: string);
}
