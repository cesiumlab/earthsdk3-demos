declare const _default: "void gaussianSplatStage(inout vec4 color, in ProcessedAttributes attributes) {\n    mediump float A = dot(v_vertPos, v_vertPos);\n    if(A > 1.0)\n        discard;\n    mediump float scale = 4.0;\n    mediump float B = exp(-A * scale) * (v_splatColor.a);\n    color = vec4(v_splatColor.rgb * B, B);\n}\n\n";
export default _default;
