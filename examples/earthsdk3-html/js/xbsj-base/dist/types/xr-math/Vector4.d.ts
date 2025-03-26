import { Number4 } from "./Numbers";
export declare namespace Vector4 {
    /**
     * 只能处理[0-1)之间的depth
     * @param depth
     * @param target
     */
    function packDepth(depth: number, target?: Number4): Uint8Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    } | [number, number, number, number] | Float64Array;
    /**
     * 只能处理[0-1)之间的depth
     * @param packedDepth
     */
    function unpackDepth(packedDepth: Number4): number;
    function uint32ToFourUint8s(uint32Number: number, target?: Number4): Uint8Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    } | [number, number, number, number] | Float64Array;
    function fourUint8sToUint32(uint8Numbers: Readonly<Number4>): number;
    const ONE: Number4;
    const ZERO: Number4;
}
