import { Event } from '../base';
import { ProcessingDeprecated } from '../ProcessingsDeprecated/Processing';
/**
 * @deprecated
 */
export declare class IntervalDeprecated extends ProcessingDeprecated<void> {
    _intervalID?: ReturnType<typeof setInterval>;
    _intervalFunc?: (value: void) => void;
    constructor(intervalTime: number, leading?: boolean);
}
export interface IntervalDeprecated {
    leading: boolean;
    leadingChanged: Event<[boolean, boolean]>;
}
export interface IntervalDeprecated {
    intervalTime: number;
    intervalTimeChanged: Event<[number, number]>;
}
