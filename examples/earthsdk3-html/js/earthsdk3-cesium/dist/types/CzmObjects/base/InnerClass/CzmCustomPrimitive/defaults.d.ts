import { CzmAttributesType } from "../../../../ESJTypesCzm";
import { BoundingVolumeJsonType, CzmCustomPrimitiveUniformMapType } from "./types";
export declare const defaultVertexShaderSource = "in vec3 position;\nin vec3 normal;\nin vec2 st;\nout vec3 v_normalEC;\nout vec2 v_st;\nvoid main()\n{\n    // \u5982\u679C\u8FD9\u4E00\u53E5\u6CE8\u91CA\uFF0C\u8981\u76F8\u5E94\u5730\u6CE8\u91CA\u6389attribute\u4E2D\u7684normal\uFF0C\u4E5F\u5C31\u662F\u8BF4\u9876\u70B9\u5C5E\u6027\u8981\u548Cshader\u4E2D\u7684\u4E00\u4E00\u5339\u914D\uFF01\n    v_normalEC = czm_normal * normal; \n    v_st = st;\n    gl_Position = czm_modelViewProjection * vec4(position, 1.0);\n}\n";
export declare const defaultFragmentShaderSource = "in vec2 v_st;\nuniform sampler2D u_image;\nuniform vec4 u_color;\nvoid main()\n{\n    vec4 imageColor = texture(u_image, v_st);\n    out_FragColor = imageColor * u_color;\n}\n";
export declare const defaultBoundingVolume: BoundingVolumeJsonType;
export declare const defaultRenderState: {
    depthTest: {
        enabled: boolean;
    };
    cull: {
        enabled: boolean;
        face: number;
    };
    depthMask: boolean;
    blending: {
        enabled: boolean;
        equationRgb: number;
        equationAlpha: number;
        functionSourceRgb: number;
        functionSourceAlpha: number;
        functionDestinationRgb: number;
        functionDestinationAlpha: number;
    };
};
export declare const defaultUniformMap: CzmCustomPrimitiveUniformMapType;
export declare const defaultAttribute: CzmAttributesType;
export declare const defaultIndexTypedArray: Uint16Array;
export declare const defaultDsAttribute: CzmAttributesType;
export declare const defaultDsIndexTypedArray: Uint16Array;
