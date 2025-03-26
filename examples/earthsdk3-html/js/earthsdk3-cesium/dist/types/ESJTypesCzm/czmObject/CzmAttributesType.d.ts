import * as Cesium from 'cesium';
export type CzmAttributesType = {
    [k: string]: CzmAttributeType;
};
export type CzmAttributeType = {
    typedArray: Float32Array | Float64Array | Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array;
    componentsPerAttribute: 1 | 2 | 3 | 4;
    usage?: Cesium.BufferUsage;
    normalize?: boolean;
};
