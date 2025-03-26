import { Destroyable, Event } from "xbsj-base";
import { EditingProcessing } from ".";
import { PolylinePositionEditor } from "../PolylinePositionEditor";
export declare class ModifyingEditingProcessing extends Destroyable {
    private _editing;
    private _overEvent;
    get overEvent(): Event<[number]>;
    get editing(): EditingProcessing;
    private _cancelEvent;
    cancel(): void;
    private _forceModifyPosEditorEvent;
    modify(posEditor: PolylinePositionEditor): void;
    constructor(_editing: EditingProcessing);
}
