import { CancelsManager, Processing } from '../Processings';
/**
 * 该方法还未验证！
 * @param cancelsManager
 * @param procesing
 * @param args
 * @returns
 */
export declare function stepProcessing<CompleteValueType = void, StartValueType extends any[] = []>(cancelsManager: CancelsManager, procesing: Processing<CompleteValueType, StartValueType>, ...args: StartValueType): Promise<CompleteValueType>;
