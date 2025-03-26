import { Destroyable } from "../base";
import { PointerClick } from "./PointerClick";
export declare class DivPointerClick extends Destroyable {
    private _div;
    get div(): HTMLDivElement;
    private _pointerClick;
    get pointerClick(): PointerClick;
    get clickEvent(): import("../base").Event<[pointerEvent: PointerEvent]>;
    get dbclickEvent(): import("../base").Event<[pointerEvent: PointerEvent]>;
    constructor(_div: HTMLDivElement, options?: boolean | AddEventListenerOptions | undefined);
}
