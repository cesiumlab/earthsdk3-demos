export declare class CancelError extends Error {
}
export type CancelFuncType = (cancelError?: CancelError) => void;
export type CancelAndPromise<T> = [CancelFuncType, Promise<T>];
export type PurePromisesArgs1<R0> = [CancelAndPromise<R0>];
export type PurePromisesArgs2<R0, R1> = [CancelAndPromise<R0>, CancelAndPromise<R1>];
export type PurePromisesArgs3<R0, R1, R2> = [CancelAndPromise<R0>, CancelAndPromise<R1>, CancelAndPromise<R2>];
export type PurePromisesArgs4<R0, R1, R2, R3> = [CancelAndPromise<R0>, CancelAndPromise<R1>, CancelAndPromise<R2>, CancelAndPromise<R3>];
export type PurePromisesArgs5<R0, R1, R2, R3, R4> = [CancelAndPromise<R0>, CancelAndPromise<R1>, CancelAndPromise<R2>, CancelAndPromise<R3>, CancelAndPromise<R4>];
export type PurePromisesArgs6<R0, R1, R2, R3, R4, R5> = [CancelAndPromise<R0>, CancelAndPromise<R1>, CancelAndPromise<R2>, CancelAndPromise<R3>, CancelAndPromise<R4>, CancelAndPromise<R5>];
export type PurePromisesArgs7<R0, R1, R2, R3, R4, R5, R6> = [CancelAndPromise<R0>, CancelAndPromise<R1>, CancelAndPromise<R2>, CancelAndPromise<R3>, CancelAndPromise<R4>, CancelAndPromise<R5>, CancelAndPromise<R6>];
export type PurePromises_Rtn1<R0> = [Promise<R0>];
export type PurePromises_Rtn2<R0, R1> = [Promise<R0>, Promise<R1>];
export type PurePromises_Rtn3<R0, R1, R2> = [Promise<R0>, Promise<R1>, Promise<R2>];
export type PurePromises_Rtn4<R0, R1, R2, R3> = [Promise<R0>, Promise<R1>, Promise<R2>, Promise<R3>];
export type PurePromises_Rtn5<R0, R1, R2, R3, R4> = [Promise<R0>, Promise<R1>, Promise<R2>, Promise<R3>, Promise<R4>];
export type PurePromises_Rtn6<R0, R1, R2, R3, R4, R5> = [Promise<R0>, Promise<R1>, Promise<R2>, Promise<R3>, Promise<R4>, Promise<R5>];
export type PurePromises_Rtn7<R0, R1, R2, R3, R4, R5, R6> = [Promise<R0>, Promise<R1>, Promise<R2>, Promise<R3>, Promise<R4>, Promise<R5>, Promise<R6>];
