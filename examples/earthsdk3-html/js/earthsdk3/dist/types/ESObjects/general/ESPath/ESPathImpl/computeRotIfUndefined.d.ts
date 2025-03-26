import { ESPathImpl, TimePosRotType } from ".";
export declare function computeRotIfUndefinedUsingPrevLine(timePosRots: TimePosRotType[], force?: boolean): TimePosRotType[];
export declare function computeRotIfUndefinedUsingNextLine(timePosRots: TimePosRotType[], force?: boolean): TimePosRotType[];
export declare function setRotIfUndefined(timePosRots: TimePosRotType[], value: [number, number, number]): void;
export declare function computeRotIfUndefinedUsingLerp(timePosRots: TimePosRotType[], force?: boolean): TimePosRotType[];
/**
 * @param geoPath
 * @param intervalDistance
 * @param reserveOrigin
 * @returns
 */
export declare function addAroundPoints(geoPath: ESPathImpl, intervalDistance: number[], reserveOrigin: boolean): undefined;
