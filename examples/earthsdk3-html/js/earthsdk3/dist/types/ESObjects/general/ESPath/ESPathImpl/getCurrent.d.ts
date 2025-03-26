import { TimePosRotType } from ".";
import { CurrentInfoType } from "./CurrentInfoType";
import { RotLerpModeType } from "./RotLerpModeType";
/**
 * 控制点的rotation有可能为undefined，这里是获取左边最近的一个控制点的rotation
 * @param timePosRots
 * @param index
 * @returns
 */
export declare function getLeftRotation(timePosRots: TimePosRotType[], index: number): [[number, number, number] | undefined, number];
/**
 * 控制点的rotation有可能为undefined，这里是获取右边最近的一个控制点的rotation
 * @param timePosRots
 * @param index
 * @returns
 */
export declare function getRightRotation(timePosRots: TimePosRotType[], index: number): [[number, number, number] | undefined, number];
export declare function getCurrent(timePosRots: TimePosRotType[], timeStamp: number, rotLerpMode?: RotLerpModeType): CurrentInfoType | undefined;
