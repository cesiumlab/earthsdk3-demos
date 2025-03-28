export declare class UniformSampler {
    private uniformName;
    name: any;
    value: any;
    _gl: any;
    _location: any;
    textureUnitIndex: any;
    constructor(gl: any, activeUniform: any, uniformName: any, location: any);
    _setSampler: (textureUnitIndex: any) => any;
    set: () => void;
}
export declare class UniformArraySampler {
    private uniformName;
    name: any;
    value: any;
    _value: any;
    _gl: any;
    _locations: any;
    textureUnitIndex: any;
    constructor(gl: any, activeUniform: any, uniformName: any, locations: any);
    _setSampler: (textureUnitIndex: any) => any;
    set: () => void;
}
