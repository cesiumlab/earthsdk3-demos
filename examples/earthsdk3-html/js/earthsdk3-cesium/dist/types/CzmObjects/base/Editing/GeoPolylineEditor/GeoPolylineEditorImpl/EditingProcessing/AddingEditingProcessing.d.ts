import { EditingProcessing } from ".";
import { Destroyable, Event } from "xbsj-base";
export declare class AddingEditingProcessing extends Destroyable {
    private _editing;
    get editing(): EditingProcessing;
    private _overEvent;
    get overEvent(): Event<[]>;
    private _deletePreviousPointEvent;
    deletePreviousPoint(): void;
    private _cancelEvent;
    cancel(): void;
    constructor(_editing: EditingProcessing, index?: number);
}
