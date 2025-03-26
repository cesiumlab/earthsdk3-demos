import { Destroyable, ExtractListenerParams, Listener } from 'xbsj-base';
export declare class ObjResettingWithEvent<T extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}, R extends Listener<any[]> = Listener<any[]>> extends Destroyable {
    private _resetEvent;
    private _createFunc;
    private _obj;
    get obj(): T | undefined;
    get objChanged(): Listener<[T | undefined, T | undefined]>;
    constructor(_resetEvent: R, _createFunc: (...params: ExtractListenerParams<R>) => T | undefined, execOnInit?: boolean, initParams?: ExtractListenerParams<R>);
}
export declare class ObjResetting<T extends {
    destroy(): undefined;
} = {
    destroy(): undefined;
}, R extends Listener<any[]> = Listener<any[]>> extends Destroyable {
    private _createFunc;
    private _execOnInit;
    private _initParams?;
    private _event;
    private _objResettingWithEvent;
    get obj(): T | undefined;
    get objChanged(): Listener<[T | undefined, T | undefined]>;
    constructor(_createFunc: (...params: ExtractListenerParams<R>) => T | undefined, _execOnInit?: boolean, _initParams?: ExtractListenerParams<R> | undefined);
    reset(...params: ExtractListenerParams<R>): void;
}
