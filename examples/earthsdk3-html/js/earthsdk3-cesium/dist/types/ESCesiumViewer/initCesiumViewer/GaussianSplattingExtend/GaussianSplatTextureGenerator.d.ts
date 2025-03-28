import { RuntimeError, TaskProcessor } from 'cesium';
declare class GaussianSplatTextureGenerator {
    static _maxSortingConcurrency: number;
    static _textureTaskProcessor: TaskProcessor | undefined;
    static _taskProcessorReady: boolean;
    static _error: RuntimeError | undefined;
    static _getTextureTaskProcessor: () => TaskProcessor;
    static generateFromAttrs: (parameters: any) => Promise<object> | undefined;
}
export default GaussianSplatTextureGenerator;
