/// <reference path="../initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
/**
 * A viewport aligned quad.
 *
 * @alias BackGroundImage
 * @constructor
 *
 * @param {BoundingRectangle} [rectangle] The {@link BoundingRectangle} defining the quad's position within the viewport.
 * @param {Material} [material] The {@link Material} defining the surface appearance of the viewport quad.
 *
 * @example
 * var viewportQuad = new Cesium.BackGroundImage(new Cesium.BoundingRectangle(0, 0, 80, 40));
 * viewportQuad.material.uniforms.color = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
 */
export function BackGroundImage(material?: typeof Cesium.Material | undefined): void;
export class BackGroundImage {
    /**
     * A viewport aligned quad.
     *
     * @alias BackGroundImage
     * @constructor
     *
     * @param {BoundingRectangle} [rectangle] The {@link BoundingRectangle} defining the quad's position within the viewport.
     * @param {Material} [material] The {@link Material} defining the surface appearance of the viewport quad.
     *
     * @example
     * var viewportQuad = new Cesium.BackGroundImage(new Cesium.BoundingRectangle(0, 0, 80, 40));
     * viewportQuad.material.uniforms.color = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
     */
    constructor(material?: typeof Cesium.Material | undefined);
    /**
     * Determines if the viewport quad primitive will be shown.
     *
     * @type {Boolean}
     * @default true
     */
    show: boolean;
    /**
     * The BoundingRectangle defining the quad's position within the viewport.
     *
     * @type {BoundingRectangle}
     *
     * @example
     * viewportQuad.rectangle = new Cesium.BoundingRectangle(0, 0, 80, 40);
     */
    rectangle: typeof Cesium.BoundingRectangle;
    /**
     * The surface appearance of the viewport quad.  This can be one of several built-in {@link Material} objects or a custom material, scripted with
     * {@link https://github.com/AnalyticalGraphicsInc/cesium/wiki/Fabric|Fabric}.
     * <p>
     * The default material is <code>Material.ColorType</code>.
     * </p>
     *
     * @type Material
     *
     * @example
     * // 1. Change the color of the default material to yellow
     * viewportQuad.material.uniforms.color = new Cesium.Color(1.0, 1.0, 0.0, 1.0);
     *
     * // 2. Change material to horizontal stripes
     * viewportQuad.material = Cesium.Material.fromType(Cesium.Material.StripeType);
     *
     * @see {@link https://github.com/AnalyticalGraphicsInc/cesium/wiki/Fabric|Fabric}
     */
    material: typeof Cesium.Material;
    _material: any;
    _overlayCommand: any;
    _rs: Cesium.RenderState | undefined;
    /**
     * Called when {@link Viewer} or {@link CesiumWidget} render the scene to
     * get the draw commands needed to render this primitive.
     * <p>
     * Do not call this function directly.  This is documented just to
     * list the exceptions that may be propagated when the scene is rendered:
     * </p>
     *
     * @exception {DeveloperError} this.material must be defined.
     * @exception {DeveloperError} this.rectangle must be defined.
     */
    update(frameState: any): any;
    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <br /><br />
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     *
     * @returns {Boolean} True if this object was destroyed; otherwise, false.
     *
     * @see BackGroundImage#destroy
     */
    isDestroyed(): boolean;
    /**
     * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
     * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
     * <br /><br />
     * Once an object is destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
     * assign the return value (<code>undefined</code>) to the object as done in the example.
     *
     * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
     *
     *
     * @example
     * quad = quad && quad.destroy();
     *
     * @see BackGroundImage#isDestroyed
     */
    destroy(): void;
}
import * as Cesium from "cesium";
