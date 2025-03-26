import { Destroyable } from "../base";
import { Event } from "../base";
export declare class PointerHover extends Destroyable {
    private _hoverEvent;
    get hoverEvent(): Event<[pointerEvent: PointerEvent]>;
    private _hoverOutEvent;
    get hoverOutEvent(): Event<[]>;
    private _pointerdownEvent;
    private _pointerupEvent;
    private _pointermoveEvent;
    private _pointeroutEvent;
    pointerDown(pointerEvent: PointerEvent): void;
    pointerUp(pointerEvent: PointerEvent): void;
    pointerMove(pointerEvent: PointerEvent): void;
    pointerOut(pointerEvent: PointerEvent): void;
    delayTime: number;
    constructor();
}
