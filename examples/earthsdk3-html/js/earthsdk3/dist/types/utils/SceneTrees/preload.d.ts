import { SceneTreeJsonValue } from "./index";
export type PreloadFuncType = (sceneTreeJson: SceneTreeJsonValue, progressFunc?: PreloadProgressFuncType) => Promise<void>;
export type PreloadProgressFuncType = (ratio: number, done: number, total: number) => void;
/**
 * 场景文件中有一些东西是需要提前加载和处理的，所以就有了这个特殊的函数
 * @param sceneTreeJson
 */
export declare function preload(sceneTreeJson: SceneTreeJsonValue, progressFunc?: PreloadProgressFuncType): Promise<void>;
