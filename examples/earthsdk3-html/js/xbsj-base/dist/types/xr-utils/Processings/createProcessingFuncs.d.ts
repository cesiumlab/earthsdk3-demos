import { CancelsManager } from './CancelsManager';
import { Processing } from './Processing';
export declare function createProcessingFromPromiseCreateFunc<CompleteValueType = void, StartValueType extends any[] = []>(promiseCreateFunc: (...args: StartValueType) => Promise<CompleteValueType>): Processing<CompleteValueType, StartValueType>;
export declare function createProcessingFromPromiseCreateFuncWithStartValues<CompleteValueType = void, StartValueType extends any[] = []>(promiseCreateFunc: (...args: StartValueType) => Promise<CompleteValueType>, ...args: StartValueType): Processing<CompleteValueType, []>;
export declare function cancelFuncToCancelablePromise(cancelFunc: () => void): Promise<void>;
export declare function asyncFuncToCancelablePromise<CompleteValueType = void, StartValueType extends any[] = []>(asyncFunc: (cancelsManager: CancelsManager, ...args: StartValueType) => Promise<CompleteValueType>, ...args: StartValueType): Promise<CompleteValueType>;
/**
 * https://www.wolai.com/earthsdk/4PMvzY3kx5HHNjSKdoqLBW#r63Uh7CEfTd2AtWxHqcwLQ
 * @param asyncFunc
 * @returns
 */
export declare function createProcessingFromAsyncFunc<CompleteValueType = void, StartValueType extends any[] = []>(asyncFunc: (cancelsManager: CancelsManager, ...args: StartValueType) => Promise<CompleteValueType>): Processing<CompleteValueType, StartValueType>;
export declare function createProcessingFromAsyncFuncWithStartValues<CompleteValueType = void, StartValueType extends any[] = []>(asyncFunc: (cancelsManager: CancelsManager, ...args: StartValueType) => Promise<CompleteValueType>, ...args: StartValueType): Processing<CompleteValueType, []>;
