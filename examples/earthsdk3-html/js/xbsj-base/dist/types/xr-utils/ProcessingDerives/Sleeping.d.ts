export declare function sleep<T extends any[]>(time: number, ...args: T): Promise<T>;
export declare function createSleeping(): import("..").Processing<[], [time: number]>;
export declare function createSleepingWithStartValues<T extends any[]>(time: number, ...args: T): import("..").Processing<[...T], []>;
