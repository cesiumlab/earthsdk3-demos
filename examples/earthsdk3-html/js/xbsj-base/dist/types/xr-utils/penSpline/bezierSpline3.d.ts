export declare function getBezierSpline3BaseFactor(t: number, result?: [number, number, number, number]): [number, number, number, number];
export declare function bezierSpline3WithBaseFactor<T extends number[]>(factor: [number, number, number, number], n: number, p0: T, p1: T, p2: T, p3: T, result?: T): T;
export declare function bezierSpline3<T extends number[]>(t: number, n: number, p0: T, p1: T, p2: T, p3: T, result?: T): T;
export declare function computBezierSpline3BaseFactors(spliteNumPerSegment: number): [number, number, number, number][];
