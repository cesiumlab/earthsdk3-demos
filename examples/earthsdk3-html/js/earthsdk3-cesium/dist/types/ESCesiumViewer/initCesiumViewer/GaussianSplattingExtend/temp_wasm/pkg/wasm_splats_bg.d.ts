export function __wbg_set_wasm(val: any): void;
/**
 * @param {Float32Array} positions
 * @param {Float32Array} scales
 * @param {Float32Array} rots
 * @param {Uint8Array} colors
 * @param {number} count
 * @returns {TextureData}
 */
export function generate_texture_from_attrs(positions: Float32Array, scales: Float32Array, rots: Float32Array, colors: Uint8Array, count: number): TextureData;
/**
 * @param {GSplatData} data
 */
export function radix_sort_simd(data: GSplatData): void;
/**
 * @param {Float32Array} positions
 * @param {Float32Array} scales
 * @param {Float32Array} rotations
 * @param {Uint8Array} colors
 * @param {Float32Array} model_view
 * @param {number} count
 * @returns {Array<any>}
 */
export function radix_sort_gaussians_attrs(positions: Float32Array, scales: Float32Array, rotations: Float32Array, colors: Uint8Array, model_view: Float32Array, count: number): Array<any>;
/**
 * @param {Float32Array} positions
 * @param {Float32Array} model_view
 * @param {number} texture_width
 * @param {number} count
 * @returns {Uint32Array}
 */
export function radix_sort_gaussians_indexes(positions: Float32Array, model_view: Float32Array, texture_width: number, count: number): Uint32Array;
/**
 * @param {Float32Array} positions
 * @param {Float32Array} scales
 * @param {Float32Array} rotations
 * @param {Uint8Array} colors
 * @param {number} count
 * @returns {object}
 */
export function generate_splat_texture_from_attrs(positions: Float32Array, scales: Float32Array, rotations: Float32Array, colors: Uint8Array, count: number): object;
export function __wbg_buffer_61b7ce01341d7f88(arg0: any): any;
export function __wbg_length_65d1cd11729ced11(arg0: any): any;
export function __wbg_length_81a294bd2038fd26(arg0: any): any;
export function __wbg_length_9d7c41656543fe86(arg0: any): any;
export function __wbg_new_254fa9eac11932ae(): any[];
export function __wbg_new_3ff5b33b1ce712df(arg0: any): Uint8Array;
export function __wbg_new_688846f374351c92(): Object;
export function __wbg_new_b9ea1588c9985b80(arg0: any): Float32Array;
export function __wbg_newwithbyteoffsetandlength_5910bdf845a168eb(arg0: any, arg1: any, arg2: any): Uint32Array;
export function __wbg_newwithbyteoffsetandlength_ba35896968751d91(arg0: any, arg1: any, arg2: any): Uint8Array;
export function __wbg_newwithbyteoffsetandlength_f113a96374814bb2(arg0: any, arg1: any, arg2: any): Float32Array;
export function __wbg_newwithlength_1761a9eb039ca429(arg0: any): Uint32Array;
export function __wbg_newwithlength_34ce8f1051e74449(arg0: any): Uint8Array;
export function __wbg_newwithlength_ed665315b76ec334(arg0: any): Float32Array;
export function __wbg_push_6edad0df4b546b2c(arg0: any, arg1: any): any;
export function __wbg_set_23d69db4e5c66a6e(arg0: any, arg1: any, arg2: any): void;
export function __wbg_set_4474fae9281eafb1(arg0: any, arg1: any, arg2: any): void;
export function __wbg_set_4e647025551483bd(...args: any[]): any;
export function __wbg_set_d2ca640bc040b031(arg0: any, arg1: any, arg2: any): void;
export function __wbindgen_init_externref_table(): void;
export function __wbindgen_memory(): any;
export function __wbindgen_number_new(arg0: any): any;
export function __wbindgen_string_new(arg0: any, arg1: any): any;
export function __wbindgen_throw(arg0: any, arg1: any): void;
export class GSplatData {
    static __wrap(ptr: any): any;
    /**
     * @param {Float32Array} positions
     * @param {Float32Array} scales
     * @param {Float32Array} rotations
     * @param {Uint8Array} colors
     * @param {Float32Array} model_view
     * @param {number} count
     * @returns {GSplatData}
     */
    static fromFloat32Arrays(positions: Float32Array, scales: Float32Array, rotations: Float32Array, colors: Uint8Array, model_view: Float32Array, count: number): GSplatData;
    /**
     * @param {Float32Array} positions
     * @param {Float32Array} scales
     * @param {Float32Array} rotations
     * @param {Uint8Array} colors
     * @param {Float32Array} model_view
     * @param {number} count
     */
    constructor(positions: Float32Array, scales: Float32Array, rotations: Float32Array, colors: Uint8Array, model_view: Float32Array, count: number);
    __destroy_into_raw(): number;
    __wbg_ptr: number;
    free(): void;
    /**
     * @returns {Float32Array}
     */
    getPositions(): Float32Array;
    /**
     * @returns {Float32Array}
     */
    getScales(): Float32Array;
    /**
     * @returns {Float32Array}
     */
    getRotations(): Float32Array;
    /**
     * @returns {Uint8Array}
     */
    getColors(): Uint8Array;
}
export class TextureData {
    static __wrap(ptr: any): any;
    /**
     * @param {Uint32Array} data
     * @param {number} width
     * @param {number} height
     * @returns {TextureData}
     */
    static new(data: Uint32Array, width: number, height: number): TextureData;
    __destroy_into_raw(): number | undefined;
    __wbg_ptr: number | undefined;
    free(): void;
    /**
     * @returns {Uint32Array}
     */
    get data(): Uint32Array;
    /**
     * @returns {number}
     */
    get width(): number;
    /**
     * @returns {number}
     */
    get height(): number;
}
