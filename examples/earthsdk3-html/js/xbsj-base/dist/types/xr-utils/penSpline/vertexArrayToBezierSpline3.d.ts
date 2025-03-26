import { PenSplineVertexType } from "./PenSplineVertexJsonType";
export declare function vertexArrayToBezierSpline3Positions<T extends number[] = number[]>(vertexArray: PenSplineVertexType<T>[], n: number, loop: boolean, spliteNumPerSegment: number): T[];
