import { TimePosRotType } from './timePosRotType';
export declare function getDistancesAndTimePosRotsFromPositions(positions: [number, number, number][], arcType: "GEODESIC" | "NONE" | "RHUMB" | undefined, granularity: number): {
    timePosRots: TimePosRotType[];
    distances: number[];
} | undefined;
