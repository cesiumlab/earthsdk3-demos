/// <reference path="../../../../ESCesiumViewer/initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
export default PolylineGeometry;
/**
 * A description of a polyline modeled as a line strip; the first two positions define a line segment,
 * and each additional position defines a line segment from the previous position. The polyline is capable of
 * displaying with a material.
 *
 * @alias PolylineGeometry
 * @constructor
 *
 * @param {Object} options Object with the following properties:
 * @param {Cartesian3[]} options.positions An array of {@link Cartesian3} defining the positions in the polyline as a line strip.
 * @param {Number} [options.width=1.0] The width in pixels.
 * @param {Color[]} [options.colors] An Array of {@link Color} defining the per vertex or per segment colors.
 * @param {Boolean} [options.colorsPerVertex=false] A boolean that determines whether the colors will be flat across each segment of the line or interpolated across the vertices.
 * @param {ArcType} [options.arcType=ArcType.GEODESIC] The type of line the polyline segments must follow.
 * @param {Number} [options.granularity=CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude if options.arcType is not ArcType.NONE. Determines the number of positions in the buffer.
 * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid to be used as a reference.
 *
 * @exception {DeveloperError} At least two positions are required.
 * @exception {DeveloperError} width must be greater than or equal to one.
 * @exception {DeveloperError} colors has an invalid length.
 *
 * @see PolylineGeometry#createGeometry
 *
 * @demo {@link https://sandcastle.cesium.com/index.html?src=Polyline.html|Cesium Sandcastle Polyline Demo}
 *
 * @example
 * // A polyline with two connected line segments
 * var polyline = new Cesium.PolylineGeometry({
 *   positions : Cesium.Cartesian3.fromDegreesArray([
 *     0.0, 0.0,
 *     5.0, 0.0,
 *     5.0, 5.0
 *   ]),
 *   width : 10.0
 * });
 * var geometry = Cesium.PolylineGeometry.createGeometry(polyline);
 */
declare function PolylineGeometry(options: {
    positions: (typeof Cesium.Cartesian3)[];
    width?: number | undefined;
    colors?: (typeof Cesium.Color)[] | undefined;
    colorsPerVertex?: boolean | undefined;
    arcType?: typeof Cesium.ArcType | undefined;
    granularity?: number | undefined;
    vertexFormat?: typeof Cesium.VertexFormat | undefined;
    ellipsoid?: typeof Cesium.Ellipsoid | undefined;
}): void;
declare class PolylineGeometry {
    /**
     * A description of a polyline modeled as a line strip; the first two positions define a line segment,
     * and each additional position defines a line segment from the previous position. The polyline is capable of
     * displaying with a material.
     *
     * @alias PolylineGeometry
     * @constructor
     *
     * @param {Object} options Object with the following properties:
     * @param {Cartesian3[]} options.positions An array of {@link Cartesian3} defining the positions in the polyline as a line strip.
     * @param {Number} [options.width=1.0] The width in pixels.
     * @param {Color[]} [options.colors] An Array of {@link Color} defining the per vertex or per segment colors.
     * @param {Boolean} [options.colorsPerVertex=false] A boolean that determines whether the colors will be flat across each segment of the line or interpolated across the vertices.
     * @param {ArcType} [options.arcType=ArcType.GEODESIC] The type of line the polyline segments must follow.
     * @param {Number} [options.granularity=CesiumMath.RADIANS_PER_DEGREE] The distance, in radians, between each latitude and longitude if options.arcType is not ArcType.NONE. Determines the number of positions in the buffer.
     * @param {VertexFormat} [options.vertexFormat=VertexFormat.DEFAULT] The vertex attributes to be computed.
     * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid to be used as a reference.
     *
     * @exception {DeveloperError} At least two positions are required.
     * @exception {DeveloperError} width must be greater than or equal to one.
     * @exception {DeveloperError} colors has an invalid length.
     *
     * @see PolylineGeometry#createGeometry
     *
     * @demo {@link https://sandcastle.cesium.com/index.html?src=Polyline.html|Cesium Sandcastle Polyline Demo}
     *
     * @example
     * // A polyline with two connected line segments
     * var polyline = new Cesium.PolylineGeometry({
     *   positions : Cesium.Cartesian3.fromDegreesArray([
     *     0.0, 0.0,
     *     5.0, 0.0,
     *     5.0, 5.0
     *   ]),
     *   width : 10.0
     * });
     * var geometry = Cesium.PolylineGeometry.createGeometry(polyline);
     */
    constructor(options: {
        positions: (typeof Cesium.Cartesian3)[];
        width?: number | undefined;
        colors?: (typeof Cesium.Color)[] | undefined;
        colorsPerVertex?: boolean | undefined;
        arcType?: typeof Cesium.ArcType | undefined;
        granularity?: number | undefined;
        vertexFormat?: typeof Cesium.VertexFormat | undefined;
        ellipsoid?: typeof Cesium.Ellipsoid | undefined;
    });
    _positions: (typeof Cesium.Cartesian3)[];
    _colors: (typeof Cesium.Color)[] | undefined;
    _width: number;
    _colorsPerVertex: any;
    _vertexFormat: Cesium.VertexFormat;
    _arcType: any;
    _granularity: any;
    _ellipsoid: Cesium.Ellipsoid;
    _workerName: string;
    /**
     * The number of elements used to pack the object into an array.
     * @type {Number}
     */
    packedLength: number;
}
declare namespace PolylineGeometry {
    /**
     * Stores the provided instance into the provided array.
     *
     * @param {PolylineGeometry} value The value to pack.
     * @param {Number[]} array The array to pack into.
     * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
     *
     * @returns {Number[]} The array that was packed into
     */
    function pack(value: PolylineGeometry, array: number[], startingIndex?: number | undefined): number[];
    /**
     * Retrieves an instance from a packed array.
     *
     * @param {Number[]} array The packed array.
     * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
     * @param {PolylineGeometry} [result] The object into which to store the result.
     * @returns {PolylineGeometry} The modified result parameter or a new PolylineGeometry instance if one was not provided.
     */
    function unpack(array: number[], startingIndex?: number | undefined, result?: PolylineGeometry | undefined): PolylineGeometry;
    /**
     * Computes the geometric representation of a polyline, including its vertices, indices, and a bounding sphere.
     *
     * @param {PolylineGeometry} polylineGeometry A description of the polyline.
     * @returns {Geometry|undefined} The computed vertices and indices.
     */
    function createGeometry(polylineGeometry: PolylineGeometry): typeof Cesium.Geometry | undefined;
}
import * as Cesium from "cesium";
