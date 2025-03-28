import { CzmESVisualObject } from "../../base";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { GeoBezierPath } from "./GeoBezierPath";
import { ESGeoBezierPath } from "../../../ESObjects";
import { ESJEditingBindModeType } from "earthsdk3";
export * from './GeoPolylinePath';
export declare class CzmESGeoBezierPath extends CzmESVisualObject<ESGeoBezierPath> {
    static readonly type: void;
    editingBindMode: ESJEditingBindModeType;
    updateEditing(): void;
    private _czmBezierPath;
    get czmBezierPath(): GeoBezierPath;
    constructor(sceneObject: ESGeoBezierPath, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
    flyIn(duration: number | undefined, id: number): boolean;
}
