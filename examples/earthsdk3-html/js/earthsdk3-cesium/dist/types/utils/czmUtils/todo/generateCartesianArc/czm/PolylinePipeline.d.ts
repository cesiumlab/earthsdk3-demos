/// <reference types="@czmSrc/__declares/cesium" />
/// <reference types="earthsdk/earthsdk3-cesium/dist/types/escesiumviewer/initcesiumviewer/fixcameraflight" />
export default PolylinePipeline;
declare namespace PolylinePipeline {
    function numberOfPoints(p0: any, p1: any, minDistance: any): number;
    function numberOfPointsRhumbLine(p0: any, p1: any, granularity: any): number;
    function extractHeights(positions: any, ellipsoid: any): any[];
    /**
     * Breaks a {@link Polyline} into segments such that it does not cross the &plusmn;180 degree meridian of an ellipsoid.
     *
     * @param {Cartesian3[]} positions The polyline's Cartesian positions.
     * @param {Matrix4} [modelMatrix=Matrix4.IDENTITY] The polyline's model matrix. Assumed to be an affine
     * transformation matrix, where the upper left 3x3 elements are a rotation matrix, and
     * the upper three elements in the fourth column are the translation.  The bottom row is assumed to be [0, 0, 0, 1].
     * The matrix is not verified to be in the proper form.
     * @returns {Object} An object with a <code>positions</code> property that is an array of positions and a
     * <code>segments</code> property.
     *
     *
     * @example
     * const polylines = new Cesium.PolylineCollection();
     * const polyline = polylines.add(...);
     * const positions = polyline.positions;
     * const modelMatrix = polylines.modelMatrix;
     * const segments = Cesium.PolylinePipeline.wrapLongitude(positions, modelMatrix);
     *
     * @see PolygonPipeline.wrapLongitude
     * @see Polyline
     * @see PolylineCollection
     */
    function wrapLongitude(positions: (typeof Cesium.Cartesian3)[], modelMatrix?: typeof Cesium.Matrix4 | undefined): Object;
    /**
     * Subdivides polyline and raises all points to the specified height.  Returns an array of numbers to represent the positions.
     * @param {Object} options Object with the following properties:
     * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
     * @param {Number|Number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
     * @param {Number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the positions lie.
     * @returns {Number[]} A new array of positions of type {Number} that have been subdivided and raised to the surface of the ellipsoid.
     *
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateArc({
     *   positons: positions
     * });
     */
    function generateArc(options: {
        positions: (typeof Cesium.Cartesian3)[];
        height?: number | number[] | undefined;
        granularity?: number | undefined;
        ellipsoid?: typeof Cesium.Ellipsoid | undefined;
    }): number[];
    /**
     * Subdivides polyline and raises all points to the specified height using Rhumb lines.  Returns an array of numbers to represent the positions.
     * @param {Object} options Object with the following properties:
     * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
     * @param {Number|Number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
     * @param {Number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the positions lie.
     * @returns {Number[]} A new array of positions of type {Number} that have been subdivided and raised to the surface of the ellipsoid.
     *
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateRhumbArc({
     *   positons: positions
     * });
     */
    function generateRhumbArc(options: {
        positions: (typeof Cesium.Cartesian3)[];
        height?: number | number[] | undefined;
        granularity?: number | undefined;
        ellipsoid?: typeof Cesium.Ellipsoid | undefined;
    }): number[];
    /**
     * Subdivides polyline and raises all points to the specified height. Returns an array of new {Cartesian3} positions.
     * @param {Object} options Object with the following properties:
     * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
     * @param {Number|Number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
     * @param {Number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the positions lie.
     * @returns {Cartesian3[]} A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
     *
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateCartesianArc({
     *   positons: positions
     * });
     */
    function generateCartesianArc(options: {
        positions: (typeof Cesium.Cartesian3)[];
        height?: number | number[] | undefined;
        granularity?: number | undefined;
        ellipsoid?: typeof Cesium.Ellipsoid | undefined;
    }): (typeof Cesium.Cartesian3)[];
    /**
     * Subdivides polyline and raises all points to the specified height using Rhumb Lines. Returns an array of new {Cartesian3} positions.
     * @param {Object} options Object with the following properties:
     * @param {Cartesian3[]} options.positions The array of type {Cartesian3} representing positions.
     * @param {Number|Number[]} [options.height=0.0] A number or array of numbers representing the heights of each position.
     * @param {Number} [options.granularity = CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.
     * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid on which the positions lie.
     * @returns {Cartesian3[]} A new array of cartesian3 positions that have been subdivided and raised to the surface of the ellipsoid.
     *
     * @example
     * const positions = Cesium.Cartesian3.fromDegreesArray([
     *   -105.0, 40.0,
     *   -100.0, 38.0,
     *   -105.0, 35.0,
     *   -100.0, 32.0
     * ]);
     * const surfacePositions = Cesium.PolylinePipeline.generateCartesianRhumbArc({
     *   positons: positions
     * });
     */
    function generateCartesianRhumbArc(options: {
        positions: (typeof Cesium.Cartesian3)[];
        height?: number | number[] | undefined;
        granularity?: number | undefined;
        ellipsoid?: typeof Cesium.Ellipsoid | undefined;
    }): (typeof Cesium.Cartesian3)[];
}
import * as Cesium from "cesium";
