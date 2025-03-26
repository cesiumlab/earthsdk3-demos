import { Destroyable } from '../base';
import { CancelError } from './types';
export declare class CancelsManager extends Destroyable {
    _cancelled: boolean;
    _cancelError?: CancelError;
    _promiseSet: Set<Promise<any>>;
    _disposer?: Destroyable;
    constructor();
    get disposer(): Destroyable;
    destroyImp(): void;
    cancel(cancelError?: CancelError): void;
    get cancelFuncsNum(): number;
    finally(): void;
    check(): void;
    promise<R>(promise: Promise<R>): Promise<R>;
    promiseAny<R>(promises: Promise<R>[]): Promise<Awaited<R>>;
    promiseAll<R>(promises: Promise<R>[]): Promise<Awaited<R>[]>;
    promiseRace<R>(promises: Promise<R>[]): Promise<Awaited<R>>;
}
