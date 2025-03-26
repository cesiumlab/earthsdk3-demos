import { CancelFuncType, Processing } from "../Processings";
export declare function getPromiseFromProcessing<CompleteValueType = void, StartValueType extends any[] = []>(processing: Processing<CompleteValueType, StartValueType>, ...args: StartValueType): [CancelFuncType, Promise<CompleteValueType>];
