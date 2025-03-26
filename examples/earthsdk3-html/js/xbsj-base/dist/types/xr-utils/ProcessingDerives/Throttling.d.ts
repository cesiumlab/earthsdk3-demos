import { Processing } from "../Processings/Processing";
export declare class Throttling<T extends any[]> extends Processing<void, [func: (...args: T) => void, time: number]> {
    _doFunc?: (...args: T) => void;
    constructor();
    do(...args: T): void;
}
export declare class ThrottlingWithStartValues<T extends any[]> extends Processing<void, []> {
    _doFunc?: (...args: T) => void;
    constructor(func: (...args: T) => void, time: number);
    do(...args: T): void;
}
