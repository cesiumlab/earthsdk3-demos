import { CancelAndPromise, CancelResult, SetCancelFunc } from '../ProcessingsDeprecated';
/**
 *
 * @deprecated
 * @param time
 * @param setCancelOrCancelResultOrNeedCancelRet
 */
export declare function sleepDeprecated(time: number, setCancelOrCancelResultOrNeedCancelRet: true): CancelAndPromise<void>;
export declare function sleepDeprecated(time: number, setCancelOrCancelResultOrNeedCancelRet?: CancelResult | SetCancelFunc | false): Promise<void>;
