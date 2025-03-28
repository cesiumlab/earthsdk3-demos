import { RuntimeError, TaskProcessor } from 'cesium';
declare class GaussianSplatSorter {
    static _maxSortingConcurrency: number;
    static _sorterTaskProcessor: TaskProcessor | undefined;
    static _taskProcessorReady: boolean;
    static _error: RuntimeError | undefined;
    static _getSorterTaskProcessor: () => TaskProcessor;
    static radixSort: (parameters: any) => Promise<object> | undefined;
    static radixSortIndexes: (parameters: any) => Promise<object> | undefined;
}
export default GaussianSplatSorter;
