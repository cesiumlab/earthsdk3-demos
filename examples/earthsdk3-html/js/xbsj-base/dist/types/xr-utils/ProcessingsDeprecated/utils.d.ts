import { Destroyable } from '../base';
import { Event, Listener } from '../base';
import { ProcessingDeprecated } from './Processing';
import { ProcessingStarter } from './ProcessingStarter';
import { CancelFuncType } from './types';
export declare function getProcessingFromPromise<T>(promise: Promise<T>): ProcessingDeprecated<T, void, []>;
export declare function getPromiseFromProcessing<CompleteValueType = void, StartValueType extends any[] = []>(processing: ProcessingDeprecated<CompleteValueType, any, StartValueType>, ...args: StartValueType): [CancelFuncType, Promise<CompleteValueType>];
export declare function getPromiseFromAsyncFunc<CompleteValueType = void, ProgressValueType = void, StartValueType extends any[] = []>(asyncFunc: (ps: ProcessingStarter<CompleteValueType, ProgressValueType>, ...args: StartValueType) => Promise<CompleteValueType>, ...args: StartValueType): [CancelFuncType, Promise<CompleteValueType>];
export declare class NextAnimationFrame<CompleteValueType = void, ProgressValueType = void, StartValueType extends any[] = []> extends ProcessingDeprecated<CompleteValueType, ProgressValueType, StartValueType> {
    constructor(doFunc: (...args: StartValueType) => CompleteValueType);
}
export declare class NextMicroTask<CompleteValueType = void, ProgressValueType = void, StartValueType extends any[] = []> extends ProcessingDeprecated<CompleteValueType, ProgressValueType, StartValueType> {
    constructor(doFunc: (...args: StartValueType) => CompleteValueType);
}
export declare class NextMicroTaskEvent extends Destroyable {
    private _event;
    constructor(...events: Listener<any[]>[]);
    get event(): Event<[]>;
}
