/// <reference path="../../../../ESCesiumViewer/initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
export default GroundPolylinePrimitive;
/**
 * A GroundPolylinePrimitive represents a polyline draped over the terrain or 3D Tiles in the {@link Scene}.
 * <p>
 * Only to be used with GeometryInstances containing {@link GroundPolylineGeometry}.
 * </p>
 *
 * @alias GroundPolylinePrimitive
 * @constructor
 *
 * @param {object} [options] Object with the following properties:
 * @param {Array|GeometryInstance} [options.geometryInstances] GeometryInstances containing GroundPolylineGeometry
 * @param {Appearance} [options.appearance] The Appearance used to render the polyline. Defaults to a white color {@link Material} on a {@link PolylineMaterialAppearance}.
 * @param {boolean} [options.show=true] Determines if this primitive will be shown.
 * @param {boolean} [options.interleave=false] When <code>true</code>, geometry vertex attributes are interleaved, which can slightly improve rendering performance but increases load time.
 * @param {boolean} [options.releaseGeometryInstances=true] When <code>true</code>, the primitive does not keep a reference to the input <code>geometryInstances</code> to save memory.
 * @param {boolean} [options.allowPicking=true] When <code>true</code>, each geometry instance will only be pickable with {@link Scene#pick}.  When <code>false</code>, GPU memory is saved.
 * @param {boolean} [options.asynchronous=true] Determines if the primitive will be created asynchronously or block until ready. If false initializeTerrainHeights() must be called first.
 * @param {ClassificationType} [options.classificationType=ClassificationType.BOTH] Determines whether terrain, 3D Tiles or both will be classified.
 * @param {boolean} [options.debugShowBoundingVolume=false] For debugging only. Determines if this primitive's commands' bounding spheres are shown.
 * @param {boolean} [options.debugShowShadowVolume=false] For debugging only. Determines if the shadow volume for each geometry in the primitive is drawn. Must be <code>true</code> on creation to have effect.
 *
 * @example
 * // 1. Draw a polyline on terrain with a basic color material
 *
 * const instance = new Cesium.GeometryInstance({
 *   geometry : new Cesium.GroundPolylineGeometry({
 *      positions : Cesium.Cartesian3.fromDegreesArray([
 *          -112.1340164450331, 36.05494287836128,
 *          -112.08821010582645, 36.097804071380715
 *      ]),
 *      width : 4.0
 *   }),
 *   id : 'object returned when this instance is picked and to get/set per-instance attributes'
 * });
 *
 * scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
 *   geometryInstances : instance,
 *   appearance : new Cesium.PolylineMaterialAppearance()
 * }));
 *
 * // 2. Draw a looped polyline on terrain with per-instance color and a distance display condition.
 * // Distance display conditions for polylines on terrain are based on an approximate terrain height
 * // instead of true terrain height.
 *
 * const instance2 = new Cesium.GeometryInstance({
 *   geometry : new Cesium.GroundPolylineGeometry({
 *      positions : Cesium.Cartesian3.fromDegreesArray([
 *          -112.1340164450331, 36.05494287836128,
 *          -112.08821010582645, 36.097804071380715,
 *          -112.13296079730024, 36.168769146801104
 *      ]),
 *      loop : true,
 *      width : 4.0
 *   }),
 *   attributes : {
 *      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('green').withAlpha(0.7)),
 *      distanceDisplayCondition : new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(1000, 30000)
 *   },
 *   id : 'object returned when this instance is picked and to get/set per-instance attributes'
 * });
 *
 * scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
 *   geometryInstances : instance2,
 *   appearance : new Cesium.PolylineColorAppearance()
 * }));
 */
declare function GroundPolylinePrimitive(options?: {
    geometryInstances?: any[] | typeof Cesium.GeometryInstance | undefined;
    appearance?: any;
    show?: boolean | undefined;
    interleave?: boolean | undefined;
    releaseGeometryInstances?: boolean | undefined;
    allowPicking?: boolean | undefined;
    asynchronous?: boolean | undefined;
    classificationType?: typeof Cesium.ClassificationType | undefined;
    debugShowBoundingVolume?: boolean | undefined;
    debugShowShadowVolume?: boolean | undefined;
} | undefined): void;
declare class GroundPolylinePrimitive {
    /**
     * A GroundPolylinePrimitive represents a polyline draped over the terrain or 3D Tiles in the {@link Scene}.
     * <p>
     * Only to be used with GeometryInstances containing {@link GroundPolylineGeometry}.
     * </p>
     *
     * @alias GroundPolylinePrimitive
     * @constructor
     *
     * @param {object} [options] Object with the following properties:
     * @param {Array|GeometryInstance} [options.geometryInstances] GeometryInstances containing GroundPolylineGeometry
     * @param {Appearance} [options.appearance] The Appearance used to render the polyline. Defaults to a white color {@link Material} on a {@link PolylineMaterialAppearance}.
     * @param {boolean} [options.show=true] Determines if this primitive will be shown.
     * @param {boolean} [options.interleave=false] When <code>true</code>, geometry vertex attributes are interleaved, which can slightly improve rendering performance but increases load time.
     * @param {boolean} [options.releaseGeometryInstances=true] When <code>true</code>, the primitive does not keep a reference to the input <code>geometryInstances</code> to save memory.
     * @param {boolean} [options.allowPicking=true] When <code>true</code>, each geometry instance will only be pickable with {@link Scene#pick}.  When <code>false</code>, GPU memory is saved.
     * @param {boolean} [options.asynchronous=true] Determines if the primitive will be created asynchronously or block until ready. If false initializeTerrainHeights() must be called first.
     * @param {ClassificationType} [options.classificationType=ClassificationType.BOTH] Determines whether terrain, 3D Tiles or both will be classified.
     * @param {boolean} [options.debugShowBoundingVolume=false] For debugging only. Determines if this primitive's commands' bounding spheres are shown.
     * @param {boolean} [options.debugShowShadowVolume=false] For debugging only. Determines if the shadow volume for each geometry in the primitive is drawn. Must be <code>true</code> on creation to have effect.
     *
     * @example
     * // 1. Draw a polyline on terrain with a basic color material
     *
     * const instance = new Cesium.GeometryInstance({
     *   geometry : new Cesium.GroundPolylineGeometry({
     *      positions : Cesium.Cartesian3.fromDegreesArray([
     *          -112.1340164450331, 36.05494287836128,
     *          -112.08821010582645, 36.097804071380715
     *      ]),
     *      width : 4.0
     *   }),
     *   id : 'object returned when this instance is picked and to get/set per-instance attributes'
     * });
     *
     * scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
     *   geometryInstances : instance,
     *   appearance : new Cesium.PolylineMaterialAppearance()
     * }));
     *
     * // 2. Draw a looped polyline on terrain with per-instance color and a distance display condition.
     * // Distance display conditions for polylines on terrain are based on an approximate terrain height
     * // instead of true terrain height.
     *
     * const instance2 = new Cesium.GeometryInstance({
     *   geometry : new Cesium.GroundPolylineGeometry({
     *      positions : Cesium.Cartesian3.fromDegreesArray([
     *          -112.1340164450331, 36.05494287836128,
     *          -112.08821010582645, 36.097804071380715,
     *          -112.13296079730024, 36.168769146801104
     *      ]),
     *      loop : true,
     *      width : 4.0
     *   }),
     *   attributes : {
     *      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString('green').withAlpha(0.7)),
     *      distanceDisplayCondition : new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(1000, 30000)
     *   },
     *   id : 'object returned when this instance is picked and to get/set per-instance attributes'
     * });
     *
     * scene.groundPrimitives.add(new Cesium.GroundPolylinePrimitive({
     *   geometryInstances : instance2,
     *   appearance : new Cesium.PolylineColorAppearance()
     * }));
     */
    constructor(options?: {
        geometryInstances?: any[] | typeof Cesium.GeometryInstance | undefined;
        appearance?: any;
        show?: boolean | undefined;
        interleave?: boolean | undefined;
        releaseGeometryInstances?: boolean | undefined;
        allowPicking?: boolean | undefined;
        asynchronous?: boolean | undefined;
        classificationType?: typeof Cesium.ClassificationType | undefined;
        debugShowBoundingVolume?: boolean | undefined;
        debugShowShadowVolume?: boolean | undefined;
    } | undefined);
    /**
     * The geometry instances rendered with this primitive. This may
     * be <code>undefined</code> if <code>options.releaseGeometryInstances</code>
     * is <code>true</code> when the primitive is constructed.
     * <p>
     * Changing this property after the primitive is rendered has no effect.
     * </p>
     *
     * @readonly
     * @type {Array|GeometryInstance}
     *
     * @default undefined
     */
    readonly geometryInstances: any[] | typeof Cesium.GeometryInstance;
    _hasPerInstanceColors: boolean;
    /**
     * The {@link Appearance} used to shade this primitive. Each geometry
     * instance is shaded with the same appearance.  Some appearances, like
     * {@link PolylineColorAppearance} allow giving each instance unique
     * properties.
     *
     * @type Appearance
     *
     * @default undefined
     */
    appearance: Appearance;
    /**
     * Determines if the primitive will be shown.  This affects all geometry
     * instances in the primitive.
     *
     * @type {boolean}
     *
     * @default true
     */
    show: boolean;
    /**
     * Determines whether terrain, 3D Tiles or both will be classified.
     *
     * @type {ClassificationType}
     *
     * @default ClassificationType.BOTH
     */
    classificationType: typeof Cesium.ClassificationType;
    /**
     * This property is for debugging only; it is not for production use nor is it optimized.
     * <p>
     * Draws the bounding sphere for each draw command in the primitive.
     * </p>
     *
     * @type {boolean}
     *
     * @default false
     */
    debugShowBoundingVolume: boolean;
    _debugShowShadowVolume: any;
    _primitiveOptions: {
        geometryInstances: undefined;
        appearance: undefined;
        vertexCacheOptimize: boolean;
        interleave: any;
        releaseGeometryInstances: any;
        allowPicking: any;
        asynchronous: any;
        compressVertices: boolean;
        _createShaderProgramFunction: undefined;
        _createCommandsFunction: undefined;
        _updateAndQueueCommandsFunction: undefined;
    };
    _zIndex: any;
    _ready: boolean;
    _readyPromise: Promise<any>;
    _primitive: any;
    _sp: any;
    _sp2D: any;
    _spMorph: any;
    _renderState: Cesium.RenderState;
    _renderState3DTiles: Cesium.RenderState;
    _renderStateMorph: Cesium.RenderState;
    /**
     * Called when {@link Viewer} or {@link CesiumWidget} render the scene to
     * get the draw commands needed to render this primitive.
     * <p>
     * Do not call this function directly.  This is documented just to
     * list the exceptions that may be propagated when the scene is rendered:
     * </p>
     *
     * @exception {DeveloperError} For synchronous GroundPolylinePrimitives, you must call GroundPolylinePrimitives.initializeTerrainHeights() and wait for the returned promise to resolve.
     * @exception {DeveloperError} All GeometryInstances must have color attributes to use PolylineColorAppearance with GroundPolylinePrimitive.
     */
    update(frameState: any): void;
    /**
     * Returns the modifiable per-instance attributes for a {@link GeometryInstance}.
     *
     * @param {*} id The id of the {@link GeometryInstance}.
     * @returns {object} The typed array in the attribute's format or undefined if the is no instance with id.
     *
     * @exception {DeveloperError} must call update before calling getGeometryInstanceAttributes.
     *
     * @example
     * const attributes = primitive.getGeometryInstanceAttributes('an id');
     * attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(Cesium.Color.AQUA);
     * attributes.show = Cesium.ShowGeometryInstanceAttribute.toValue(true);
     */
    getGeometryInstanceAttributes(id: any): object;
    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <p>
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     * </p>
     *
     * @returns {boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
     *
     * @see GroundPolylinePrimitive#destroy
     */
    isDestroyed(): boolean;
    /**
     * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
     * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
     * <p>
     * Once an object is destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
     * assign the return value (<code>undefined</code>) to the object as done in the example.
     * </p>
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     * @example
     * e = e && e.destroy();
     *
     * @see GroundPolylinePrimitive#isDestroyed
     */
    destroy(): void;
}
declare namespace GroundPolylinePrimitive {
    /**
     * Initializes the minimum and maximum terrain heights. This only needs to be called if you are creating the
     * GroundPolylinePrimitive synchronously.
     *
     * @returns {Promise<void>} A promise that will resolve once the terrain heights have been loaded.
     */
    function initializeTerrainHeights(): Promise<void>;
    /**
     * Checks if the given Scene supports GroundPolylinePrimitives.
     * GroundPolylinePrimitives require support for the WEBGL_depth_texture extension.
     *
     * @param {Scene} scene The current scene.
     * @returns {boolean} Whether or not the current scene supports GroundPolylinePrimitives.
     */
    function isSupported(scene: Scene): boolean;
}
import * as Cesium from "cesium";
