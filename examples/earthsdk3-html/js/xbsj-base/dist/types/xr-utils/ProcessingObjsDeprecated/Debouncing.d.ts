import { ProcessingDeprecated } from "../ProcessingsDeprecated/Processing";
/**
 * Debouncing
 *
 * @deprecated
 * @example
 * const hideHoverDivDebouncing = this.disposeVar(new Debouncing(800));
 * hideHoverDivDebouncing.progressFunc = () => {
 *     console.log('hideHoverDiv');
 *     hideHoverDivFunc();
 * }
 * hideHoverDivDebouncing.restart();
 * hideHoverDivDebouncing.debounce();
 */
export declare class DebouncingDeprecated<LastDebounceValue extends any[] = []> extends ProcessingDeprecated<void, [LastDebounceValue, number]> {
    private _delayTime;
    _lastDebounceValue?: LastDebounceValue;
    _debouncTimes: number;
    _d?: () => void;
    constructor(_delayTime?: number);
    get delayTime(): number;
    debounce(...value: LastDebounceValue): void;
}
