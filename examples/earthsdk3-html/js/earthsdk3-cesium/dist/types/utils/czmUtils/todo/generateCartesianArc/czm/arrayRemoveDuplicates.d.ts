export default arrayRemoveDuplicates;
/**
 * Removes adjacent duplicate values in an array of values.
 *
 * @param {Array.<*>} [values] The array of values.
 * @param {Function} equalsEpsilon Function to compare values with an epsilon. Boolean equalsEpsilon(left, right, epsilon).
 * @param {Boolean} [wrapAround=false] Compare the last value in the array against the first value. If they are equal, the last value is removed.
 * @param {Array.<Number>} [removedIndices=undefined] Store the indices that correspond to the duplicate items removed from the array, if there were any.
 * @returns {Array.<*>|undefined} A new array of values with no adjacent duplicate values or the input array if no duplicates were found.
 *
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0), (1.0, 1.0, 1.0)]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon);
 *
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
 *
 * @example
 * // Returns [(1.0, 1.0, 1.0), (2.0, 2.0, 2.0), (3.0, 3.0, 3.0)]
 * // removedIndices will be equal to [1, 3, 5]
 * const values = [
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(2.0, 2.0, 2.0),
 *     new Cesium.Cartesian3(3.0, 3.0, 3.0),
 *     new Cesium.Cartesian3(1.0, 1.0, 1.0)];
 * const nonDuplicatevalues = Cesium.PolylinePipeline.removeDuplicates(values, Cartesian3.equalsEpsilon, true);
 * @private
 */
declare function arrayRemoveDuplicates(values?: any[] | undefined, equalsEpsilon: Function, wrapAround?: boolean | undefined, removedIndices?: number[] | undefined): Array<any> | undefined;
