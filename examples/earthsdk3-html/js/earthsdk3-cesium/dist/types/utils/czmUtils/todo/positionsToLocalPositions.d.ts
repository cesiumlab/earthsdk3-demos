import { NativeNumber16Type } from './numberTypes';
export type RotationModeType = 'YForwardZUp' | 'XForwardZUp';
export declare function getModelMatrixFromPosition(options: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    initialRotationMode?: RotationModeType;
    scale?: [number, number, number];
}, result?: NativeNumber16Type): NativeNumber16Type;
export declare function getInverseModelMatrix(modelMatrix: NativeNumber16Type, result?: NativeNumber16Type): NativeNumber16Type;
export declare function positionToLocalPosition(inverseModelMatrix: NativeNumber16Type, position: [number, number, number], result?: [number, number, number]): [number, number, number];
export declare function localPositionToPosition(modelMatrix: NativeNumber16Type, localPosition: [number, number, number], result?: [number, number, number]): [number, number, number];
export declare function positionsToLocalPositions(options: {
    originPosition?: [number, number, number];
    originRotation?: [number, number, number];
    initialRotationMode?: RotationModeType;
    originScale?: [number, number, number];
}, positions: [number, number, number][]): [localPositons: [number, number, number][], modelMatrix: NativeNumber16Type, inverseModelMatrix: NativeNumber16Type];
export declare function localPositionsToPositions(options: {
    originPosition?: [number, number, number];
    originRotation?: [number, number, number];
    initialRotationMode?: RotationModeType;
    originScale?: [number, number, number];
}, localPositons: [number, number, number][]): [positons: [number, number, number][], modelMatrix: NativeNumber16Type];
