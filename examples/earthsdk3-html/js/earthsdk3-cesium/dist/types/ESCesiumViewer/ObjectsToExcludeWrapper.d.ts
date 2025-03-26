import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from ".";
export declare class ObjectsToExcludeWrapper extends Destroyable {
    private _viewer;
    constructor(_viewer: ESCesiumViewer, primitives: object[] | object);
}
