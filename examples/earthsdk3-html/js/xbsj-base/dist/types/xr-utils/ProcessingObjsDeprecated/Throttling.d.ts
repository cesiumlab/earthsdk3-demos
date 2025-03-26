import { ProcessingDeprecated } from '../ProcessingsDeprecated/Processing';
/**
 * @deprecated
 */
export declare class ThrottlingDeprecated<LastDebounceValue extends any[] = []> extends ProcessingDeprecated<void, [LastDebounceValue, number]> {
    private _delayTime;
    _lastThrottleValue?: LastDebounceValue;
    _throttleTimes: number;
    _d?: () => void;
    constructor(_delayTime?: number);
    get delayTime(): number;
    do(...value: LastDebounceValue): void;
}
