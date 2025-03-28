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
export default __wbg_init;
export function initSync(module: any): any;
declare function __wbg_init(module_or_path: any): Promise<any>;
