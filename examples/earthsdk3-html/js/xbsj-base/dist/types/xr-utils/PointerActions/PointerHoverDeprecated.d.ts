import { Destroyable } from '../base';
import { Event } from '../base';
export declare class PointerHoverDeprecated extends Destroyable {
    _hoverEvent: Event<[number, number, PointerEvent | undefined]>;
    _hoverOutEvent: Event;
    constructor(div: HTMLDivElement, delayTime?: number);
    get hoverEvent(): Event<[number, number, PointerEvent | undefined]>;
    get hoverOutEvent(): Event<[]>;
}
