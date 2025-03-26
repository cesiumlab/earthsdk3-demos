export declare const previewCustomPrimitiveJson: {
    id: string;
    type: string;
    show: boolean;
    allowPicking: boolean;
    cull: boolean;
    pass: string;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    uniformMap: {
        u_image: {
            type: string;
            id: string;
        };
    };
    name: string;
    attributes: {
        position: {
            typedArray: {
                type: string;
                array: number[];
            };
            componentsPerAttribute: number;
        };
        textureCoordinates: {
            typedArray: {
                type: string;
                array: number[];
            };
            componentsPerAttribute: number;
        };
    };
};
