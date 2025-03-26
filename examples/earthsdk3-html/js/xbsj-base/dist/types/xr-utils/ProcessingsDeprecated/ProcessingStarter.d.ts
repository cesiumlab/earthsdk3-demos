import { Destroyable } from '../base';
import { CancelAndPromise, CancelError, PurePromisesArgs1, PurePromisesArgs2, PurePromisesArgs3, PurePromisesArgs4, PurePromisesArgs5, PurePromisesArgs6, PurePromisesArgs7, PurePromises_Rtn1, PurePromises_Rtn2, PurePromises_Rtn3, PurePromises_Rtn4, PurePromises_Rtn5, PurePromises_Rtn6, PurePromises_Rtn7 } from './types';
/**
 * 和Processing配套使用的进度启动管理器
 *
 * @example
 * const processing = new Processing<void>(s => {
 *     const ps = new ProcessingStarter(s);
 *     (async () => {
 *         ps.disposer.dispose(() => console.log(`cm destroyed!`));
 *         await ps.checkAndPromise(cancelablePromise(Promise.resolve(1)));
 *         console.log(1);
 *         await ps.checkAndPromise(sleep(1000, true));
 *         console.log(2);
 *         await ps.checkAndPromise(sleep(1000, true));
 *         // throw new Error(`未知错误！`);
 *         // throw new CancelError(`未知取消错误！`);
 *         console.log(3);
 *         await ps.checkAndPromise(sleep(1000, true));
 *         console.log(4);
 *         // cm.forceCancel(new CancelError(`我被强制取消！`));
 *         await ps.checkAndPromise(sleep(1000, true));
 *         console.log(5);
 *         ps.complete();
 *     })().catch(ps.error.bind(ps));
 *
 *     return () => ps.cancel();
 * });
 *
 * processing.start();
 * processing.errorFunc = error => console.log(`error: ${error}`);
 * processing.completeFunc = () => console.log(`completed`);
 * processing.cancelFunc = () => console.log(`cancel`);
 * processing.cancelledFunc = cancelError => console.log(`cancelled ${cancelError}`);
 */
export declare class ProcessingStarter<CompleteValueType, ProgressValueType> {
    private _startParams;
    _cancelled: boolean;
    _cancelError?: CancelError;
    _cancelsMap: Map<Promise<any>, (cancelError?: CancelError) => void>;
    _disposer?: Destroyable;
    constructor(_startParams: {
        readonly progressFunc: (value: ProgressValueType) => void;
        readonly completeFunc: (value: CompleteValueType) => void;
        readonly errorFunc: (error: any) => void;
        readonly cancelFunc: (cancelError?: CancelError) => Promise<void> | undefined;
        readonly processingID: number;
    });
    get disposer(): Destroyable;
    cancel(cancelError?: CancelError): void;
    check(): void;
    get cancelFuncsNum(): number;
    get processingID(): number;
    promises<R0>(...args: PurePromisesArgs1<R0>): PurePromises_Rtn1<R0>;
    promises<R0, R1>(...args: PurePromisesArgs2<R0, R1>): PurePromises_Rtn2<R0, R1>;
    promises<R0, R1, R2>(...args: PurePromisesArgs3<R0, R1, R2>): PurePromises_Rtn3<R0, R1, R2>;
    promises<R0, R1, R2, R3>(...args: PurePromisesArgs4<R0, R1, R2, R3>): PurePromises_Rtn4<R0, R1, R2, R3>;
    promises<R0, R1, R2, R3, R4>(...args: PurePromisesArgs5<R0, R1, R2, R3, R4>): PurePromises_Rtn5<R0, R1, R2, R3, R4>;
    promises<R0, R1, R2, R3, R4, R5>(...args: PurePromisesArgs6<R0, R1, R2, R3, R4, R5>): PurePromises_Rtn6<R0, R1, R2, R3, R4, R5>;
    promises<R0, R1, R2, R3, R4, R5, R6>(...args: PurePromisesArgs7<R0, R1, R2, R3, R4, R5, R6>): PurePromises_Rtn7<R0, R1, R2, R3, R4, R5, R6>;
    promises<R>(...args: CancelAndPromise<R>[]): Promise<R>[];
    promise<R>(promiseOrCancelAndPromise: CancelAndPromise<R>): Promise<R>;
    promiseAny<R>(canelAndPromisePairs: CancelAndPromise<R>[]): Promise<Awaited<R>>;
    promiseAll<R>(canelAndPromisePairs: CancelAndPromise<R>[]): Promise<Awaited<R>[]>;
    promiseRace<R>(canelAndPromisePairs: CancelAndPromise<R>[]): Promise<Awaited<R>>;
    checkAndPromises<R0>(...args: PurePromisesArgs1<R0>): PurePromises_Rtn1<R0>;
    checkAndPromises<R0, R1>(...args: PurePromisesArgs2<R0, R1>): PurePromises_Rtn2<R0, R1>;
    checkAndPromises<R0, R1, R2>(...args: PurePromisesArgs3<R0, R1, R2>): PurePromises_Rtn3<R0, R1, R2>;
    checkAndPromises<R0, R1, R2, R3>(...args: PurePromisesArgs4<R0, R1, R2, R3>): PurePromises_Rtn4<R0, R1, R2, R3>;
    checkAndPromises<R0, R1, R2, R3, R4>(...args: PurePromisesArgs5<R0, R1, R2, R3, R4>): PurePromises_Rtn5<R0, R1, R2, R3, R4>;
    checkAndPromises<R0, R1, R2, R3, R4, R5>(...args: PurePromisesArgs6<R0, R1, R2, R3, R4, R5>): PurePromises_Rtn6<R0, R1, R2, R3, R4, R5>;
    checkAndPromises<R0, R1, R2, R3, R4, R5, R6>(...args: PurePromisesArgs7<R0, R1, R2, R3, R4, R5, R6>): PurePromises_Rtn7<R0, R1, R2, R3, R4, R5, R6>;
    checkAndPromises<R>(...args: CancelAndPromise<R>[]): Promise<R>[];
    checkAndPromise<R>(promiseOrCancelAndPromise: CancelAndPromise<R> | Promise<R>): Promise<R>;
    complete(value: CompleteValueType): void;
    error(reason: any): void;
    progressFunc(value: ProgressValueType): void;
    /**
     * Processing过程中强制调用cancel！一般情况下不使用！
     * @param cancelError
     * @returns
     */
    forceCancel(cancelError?: CancelError): Promise<void> | undefined;
}
