export declare function debounce<T extends any[]>(fn: (...args: T) => void, time: number): [(...args: T) => void, () => void];
