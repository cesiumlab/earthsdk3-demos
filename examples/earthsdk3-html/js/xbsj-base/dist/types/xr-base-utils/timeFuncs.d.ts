export declare function interval<T extends any[]>(func: (...args: T) => void, time: number, ...args: T): () => void;
export declare function timeout<T extends any[]>(func: (...args: T) => void, time: number, ...args: T): () => void;
export declare function animateFrame<T extends any[]>(func: (timeStamp: number, ...args: T) => void, ...args: T): () => false | undefined;
export declare function nextAnimateFrame<T extends any[]>(func: (timeStamp: number, ...args: T) => void, ...args: T): () => false | undefined;
export declare function nextMicroTask<T extends any[]>(func: (...args: T) => void, ...args: T): () => undefined;
