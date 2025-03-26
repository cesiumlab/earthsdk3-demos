export type PenSplineVertexType<T extends number[] = number[]> = {
    position: T;
    leftPosition: T | undefined;
    rightPosition: T | undefined;
};
export declare function equalsPenSplineVertexType<T extends number[] = number[]>(left: PenSplineVertexType<T>, right: PenSplineVertexType<T>, n: number): boolean;
