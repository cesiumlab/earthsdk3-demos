import { Destroyable } from '../base';
import { Event } from '../base';
import { CancelError } from './types';
import { CancelsManager } from './CancelsManager';
export type ProcessingStatus = 'Initial' | 'Running' | 'Completed' | 'Error';
export type StartProcessingFuncType<CompleteValueType, StartValueType extends any[]> = (options: {
    readonly completeFunc: (value: CompleteValueType) => void;
    readonly errorFunc: (error: any) => void;
    readonly runningingID: number;
}, ...args: StartValueType) => ((cancelError?: CancelError) => void);
/**
 * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB
 */
export declare class Processing<CompleteValueType = void, StartValueType extends any[] = []> extends Destroyable {
    private _startFunc;
    private _status;
    private _completeEvent?;
    private _errorEvent?;
    private _completeFunc?;
    private _errorFunc?;
    private _cancelFunc?;
    private _runningId;
    constructor(_startFunc: StartProcessingFuncType<CompleteValueType, StartValueType>);
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#i86yvkEY3EAXJnwGXATvYp
     */
    get errorEvent(): Event<[any]>;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#3xz4yuf1a864VTj7EgQWn6
     */
    get completeEvent(): Event<[CompleteValueType]>;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#3v2jhJbqnhWGa6aErf31vn
     */
    get errorFunc(): ((error: any) => void) | undefined;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#dctp5BjLX7fYmv5j5tJrxz
     */
    get completeFunc(): ((completeValue: CompleteValueType) => void) | undefined;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#3v2jhJbqnhWGa6aErf31vn
     */
    set errorFunc(value: ((error: any) => void) | undefined);
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#dctp5BjLX7fYmv5j5tJrxz
     */
    set completeFunc(value: ((completeValue: CompleteValueType) => void) | undefined);
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#66nUbv1mySmP3ubdTVVTQe
     * @param args
     * @returns
     */
    start(...args: StartValueType): void;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#iEmoSfKNeFxpW5a5VKoJNh
     * @param cancelError
     * @returns
     */
    cancel(cancelError?: CancelError): void;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#hDkAEBX1awLvVFwihhaQpS
     */
    reset(): void;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#hUiFTcw5AwV9SWPxxjVC51
     */
    get status(): ProcessingStatus;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#muAtUjWtMCQEZLPDBbFk3g
     */
    get isInitial(): boolean;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#7xxmjifYFacXunE1fgg1Aj
     */
    get isRunning(): boolean;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#dLT9DGHpSrSuY3PFEzYCsW
     */
    get isCompleted(): boolean;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#xsaywy1rzH7bHrJg1rzna4
     */
    get isError(): boolean;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#s3Pp75U6JXsDBPTi9MMmmg
     */
    get runningId(): number;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#9pXS4C7VQRuzZ9CFFaQ7Qx
     * @param cancelError
     * @param args
     */
    restart(cancelError?: CancelError, ...args: StartValueType): void;
    /**
     * https://www.wolai.com/earthsdk/mJn6oNVFWgXciyggRo5XyB#gDex7mq3R5K2zgb3ixLLen
     * @param args
     */
    restartIfNotRunning(...args: StartValueType): void;
}
export declare function createStartFuncFromAsyncFunc<CompleteValueType, StartValueType extends any[]>(asyncFunc: (cancelsManager: CancelsManager, ...args: StartValueType) => Promise<CompleteValueType>): StartProcessingFuncType<CompleteValueType, StartValueType>;
