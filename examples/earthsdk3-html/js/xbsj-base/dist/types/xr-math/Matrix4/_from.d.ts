import { Number16, Number3, Number9 } from "../Numbers";
export declare function _fromTranslation(translation: Readonly<Number3>, result?: Number16): Number16;
/**
 * Computes a Matrix4 instance from a Matrix3 representing the rotation
 * and a Cartesian3 representing the translation.
 *
 * @param {Matrix3} rotation The upper left portion of the matrix representing the rotation.
 * @param {Cartesian3} [translation=Cartesian3.ZERO] The upper right portion of the matrix representing the translation.
 * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
 * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
 */
export declare function _fromMatrix3AndTranslation(rotation: Readonly<Number9>, translation?: Readonly<Number3>, result?: Number16): Number16;
export declare function _fromDirectionUpRightAndTranslation(direction: Readonly<Number3>, up: Readonly<Number3>, right: Readonly<Number3>, translation?: Readonly<Number3>, target?: Number16): Number16;
