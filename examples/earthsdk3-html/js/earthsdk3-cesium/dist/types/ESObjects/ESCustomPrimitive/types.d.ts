import * as Cesium from "cesium";
export type CzmPassType = 'ENVIRONMENT' | 'COMPUTE' | 'GLOBE' | 'TERRAIN_CLASSIFICATION' | 'CESIUM_3D_TILE' | 'CESIUM_3D_TILE_CLASSIFICATION' | 'CESIUM_3D_TILE_CLASSIFICATION_IGNORE_SHOW' | 'OPAQUE' | 'TRANSLUCENT' | 'OVERLAY' | 'NUMBER_OF_PASSES';
export type CzmPrimitiveType = 'POINTS' | 'LINES' | 'LINE_LOOP' | 'LINE_STRIP' | 'TRIANGLES' | 'TRIANGLE_STRIP' | 'TRIANGLE_FAN';
export declare const primitiveTypeEnums: [name: string, value: string][];
export type CzmCustomPrimitiveUniformType = number | [number, number] | [number, number, number] | [number, number, number, number] | {
    type: 'image';
    uri: string;
} | {
    type: 'texture';
    id: string;
};
export type CzmCustomPrimitiveUniformMapType = {
    [k: string]: CzmCustomPrimitiveUniformType;
};
export declare const passEnums: [name: string, value: string][];
export type AttributeJsonType = {
    typedArray: {
        type: 'Float32Array' | 'Float64Array' | 'Int8Array' | 'Uint8Array' | 'Int16Array' | 'Uint16Array' | 'Int32Array' | 'Uint32Array';
        array: number[];
    };
    componentsPerAttribute: 1 | 2 | 3 | 4;
    usage?: Cesium.BufferUsage;
    normalize?: boolean;
};
export type AttributesJsonType = {
    [k: string]: AttributeJsonType;
};
export type IndexJsonType = {
    type: 'Uint8Array' | 'Uint16Array' | 'Uint32Array';
    array: number[];
};
export type BoundingVolumeJsonType = {
    type: 'BoundingSphere';
    data: {
        center: [number, number, number];
        radius: number;
    };
} | {
    type: 'LocalBoundingSphere';
    data: {
        center: [number, number, number];
        radius: number;
    };
} | {
    type: 'BoundingRectangle';
    data: [west: number, south: number, east: number, north: number];
} | {
    type: 'LocalAxisedBoundingBox';
    data: {
        min: [number, number, number];
        max: [number, number, number];
    };
};
export type BlendEquation = 32774 | 32778 | 32779 | 32775 | 32776;
export type BlendFunction = 0 | 1 | 768 | 769 | 774 | 775 | 770 | 771 | 772 | 773 | 32769 | 32770 | 32771 | 32772 | 776;
export type StencilFunction = 512 | 513 | 514 | 515 | 516 | 517 | 518 | 519;
export type StencilOperation = 0 | 7680 | 7681 | 7682 | 7683 | 5386 | 34055 | 34056;
export interface RenderStateOptions {
    frontFace?: number;
    cull?: {
        enabled?: boolean;
        face?: 1028 | 1029 | 1032;
    };
    lineWidth?: number;
    polygonOffset?: {
        enabled?: boolean;
        factor?: number;
        units?: number;
    };
    scissorTest?: {
        enabled?: boolean;
        rectangle?: {
            x?: number;
            y?: number;
            width?: number;
            height?: number;
        };
    };
    depthRange?: {
        near?: number;
        far?: number;
    };
    depthTest?: {
        enabled?: boolean;
        func?: 512 | 513 | 514 | 515 | 516 | 517 | 518 | 519;
    };
    colorMask?: {
        red?: boolean;
        green?: boolean;
        blue?: boolean;
        alpha?: boolean;
    };
    depthMask?: boolean;
    stencilMask?: number;
    blending?: {
        enabled?: boolean;
        color?: {
            red?: number;
            green?: number;
            blue?: number;
            alpha?: number;
        };
        equationRgb?: BlendEquation;
        equationAlpha?: BlendEquation;
        functionSourceRgb?: BlendFunction;
        functionSourceAlpha?: BlendFunction;
        functionDestinationRgb?: BlendFunction;
        functionDestinationAlpha?: BlendFunction;
    };
    stencilTest?: {
        enabled?: boolean;
        frontFunction?: StencilFunction;
        backFunction?: StencilFunction;
        reference?: number;
        mask?: number;
        frontOperation?: {
            fail?: StencilOperation;
            zFail?: StencilOperation;
            zPass?: StencilOperation;
        };
        backOperation?: {
            fail?: StencilOperation;
            zFail?: StencilOperation;
            zPass?: StencilOperation;
        };
    };
    sampleCoverage?: {
        enabled?: boolean;
        value?: number;
        invert?: boolean;
    };
}
