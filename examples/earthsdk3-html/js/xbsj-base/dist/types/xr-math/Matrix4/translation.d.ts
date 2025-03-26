import { Number16, Number3 } from '../Numbers';
/**
 * Gets the translation portion of the provided matrix, assuming the matrix is a affine transformation matrix.
 *
 * @param {Matrix4} matrix The matrix to use.
 * @param {Cartesian3} target The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter.
 */
export declare function _getTranslation(matrix: Readonly<Number16>, target?: Number3): Number3;
/**
* Computes a new matrix that replaces the translation in the rightmost column of the provided
* matrix with the provided translation.  This assumes the matrix is an affine transformation
*
* @param {Matrix4} matrix The matrix to use.
* @param {Cartesian3} translation The translation that replaces the translation of the provided matrix.
* @param {Matrix4} target The object onto which to store the result.
* @returns {Matrix4} The modified result parameter.
*/
export declare function _setTranslation(matrix: Readonly<Number16>, translation: Readonly<Number3>, target?: Number16): Number16;
