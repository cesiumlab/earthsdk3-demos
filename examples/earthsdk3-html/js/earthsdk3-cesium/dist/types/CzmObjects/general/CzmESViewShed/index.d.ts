import { ESJEditingBindModeType, ESViewShed } from "earthsdk3";
import { CzmESObjectWithLocation } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { XbsjViewshed } from "./XbsjViewshed";
export declare class CzmESViewShed extends CzmESObjectWithLocation<ESViewShed> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    private _czmViewShed;
    get czmViewShed(): XbsjViewshed | undefined;
    constructor(sceneObject: ESViewShed, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
