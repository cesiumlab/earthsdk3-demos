import { Destroyable } from "../base";
import { Event } from "../base";
import { TimingDeprecated } from "./Timing";
/**
 * @deprecated
 */
export declare class TransitionDeprecated extends Destroyable {
    private _duration;
    _target: 0 | 1;
    _current: number;
    _start: number;
    _timing: TimingDeprecated;
    _currentChanged?: Event<[0 | 1, number]>;
    constructor(_duration: number);
    reset(start: 0 | 1, current?: number): void;
    set target(value: 0 | 1);
    get target(): 0 | 1;
    get current(): number;
    get currentChanged(): Event<[0 | 1, number]>;
}
