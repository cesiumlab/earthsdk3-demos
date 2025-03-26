import { Destroyable, Event } from "xbsj-base";
import { AddingEditingProcessing } from "./AddingEditingProcessing";
export declare class PointAdding extends Destroyable {
    private _adding;
    get adding(): AddingEditingProcessing;
    private _overEvent;
    get overEvent(): Event<[boolean]>;
    constructor(_adding: AddingEditingProcessing, index: number);
}
