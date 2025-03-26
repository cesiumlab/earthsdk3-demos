import { ProcessingDeprecated } from "./Processing";
import { ProcessingStarter } from "./ProcessingStarter";
/**
 *
 * @param asyncFunc
 * @returns
 */
export declare function createProcessing<CompleteValueType, ProgressValueType = void, StartValueType extends any[] = []>(asyncFunc: (ps: ProcessingStarter<CompleteValueType, ProgressValueType>, ...args: StartValueType) => Promise<CompleteValueType>): ProcessingDeprecated<CompleteValueType, ProgressValueType, StartValueType>;
