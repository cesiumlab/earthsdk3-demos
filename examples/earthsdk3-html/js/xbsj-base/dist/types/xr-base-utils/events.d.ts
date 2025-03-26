import { Event, Listener } from "./pipe";
declare class NextEvent extends Event {
    private _nextFunc;
    private _cancellFunc;
    next(): void;
    constructor(_nextFunc: (func: (timeStamp: number) => void) => () => false | undefined, weak: boolean, ...events: Listener<any[]>[]);
    /**
     * 消息即时处理掉，不再等待下一个周期
     */
    flush(): void;
}
export declare class NextMicroTaskEvent extends NextEvent {
    constructor(...events: Listener<any[]>[]);
}
export declare function createNextMicroTaskEvent(...events: Listener<any[]>[]): NextMicroTaskEvent;
export declare class NextMicroTaskWeakEvent extends NextEvent {
    constructor(...events: Listener<any[]>[]);
}
export declare function createNextMicroTaskWeakEvent(...events: Listener<any[]>[]): NextMicroTaskEvent;
export declare class NextAnimateFrameEvent extends NextEvent {
    constructor(...events: Listener<any[]>[]);
}
export declare function createNextAnimateFrameEvent(...events: Listener<any[]>[]): NextAnimateFrameEvent;
export declare class NextAnimateFrameWeakEvent extends NextEvent {
    constructor(...events: Listener<any[]>[]);
}
export declare function createNextAnimateFrameWeakEvent(...events: Listener<any[]>[]): NextAnimateFrameWeakEvent;
export {};
