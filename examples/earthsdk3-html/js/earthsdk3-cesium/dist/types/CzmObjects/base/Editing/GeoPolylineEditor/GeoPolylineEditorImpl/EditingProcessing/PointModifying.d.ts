import { Destroyable, Event } from "xbsj-base";
import { PolylinePositionEditor } from "../PolylinePositionEditor";
import { ModifyingEditingProcessing } from "./ModifyingEditingProcessing";
export declare class PointModifying extends Destroyable {
    private _modifying;
    private _posEditor;
    private _overed;
    private _overEvent;
    get overEvent(): Event<[]>;
    constructor(_modifying: ModifyingEditingProcessing, _posEditor: PolylinePositionEditor);
}
