export type ParseGlbResultType = {
    version: number;
    length: number;
    gltfJson: string;
    gltfBinary?: ArrayBuffer | Uint8Array;
};
export declare function parseGlb(glbBuffer: ArrayBuffer | ArrayBufferView): ParseGlbResultType | undefined;
export declare function parseWaterGlb(glbBuffer: ArrayBuffer | ArrayBufferView): any;
