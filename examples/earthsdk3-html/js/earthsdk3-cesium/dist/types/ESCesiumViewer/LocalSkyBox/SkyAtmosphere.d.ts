/// <reference path="../initCesiumViewer/fixCameraFlight.d.ts" />
/// <reference types="@czmSrc/__declares/cesium" />
export default SkyAtmosphere;
/**
 * An atmosphere drawn around the limb of the provided ellipsoid. Based on
 * {@link http://nishitalab.org/user/nis/cdrom/sig93_nis.pdf|Display of The Earth Taking Into Account Atmospheric Scattering}.
 * <p>
 * This is only supported in 3D. Atmosphere is faded out when morphing to 2D or Columbus view.
 * </p>
 *
 * @alias SkyAtmosphere
 * @constructor
 *
 * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid that the atmosphere is drawn around.
 *
 * @example
 * scene.skyAtmosphere = new Cesium.SkyAtmosphere();
 *
 * @see Scene.skyAtmosphere
 */
declare function SkyAtmosphere(ellipsoid?: typeof Cesium.Ellipsoid | undefined, sources: any): void;
declare class SkyAtmosphere {
    /**
     * An atmosphere drawn around the limb of the provided ellipsoid. Based on
     * {@link http://nishitalab.org/user/nis/cdrom/sig93_nis.pdf|Display of The Earth Taking Into Account Atmospheric Scattering}.
     * <p>
     * This is only supported in 3D. Atmosphere is faded out when morphing to 2D or Columbus view.
     * </p>
     *
     * @alias SkyAtmosphere
     * @constructor
     *
     * @param {Ellipsoid} [ellipsoid=Ellipsoid.WGS84] The ellipsoid that the atmosphere is drawn around.
     *
     * @example
     * scene.skyAtmosphere = new Cesium.SkyAtmosphere();
     *
     * @see Scene.skyAtmosphere
     */
    constructor(ellipsoid?: typeof Cesium.Ellipsoid | undefined, sources: any);
    /**
     * Determines if the atmosphere is shown.
     *
     * @type {boolean}
     * @default true
     */
    show: boolean;
    sources: any;
    /**
     * Compute atmosphere per-fragment instead of per-vertex.
     * This produces better looking atmosphere with a slight performance penalty.
     *
     * @type {boolean}
     * @default false
     */
    perFragmentAtmosphere: boolean;
    _ellipsoid: typeof Cesium.Ellipsoid | undefined;
    _scaleMatrix: Cesium.Matrix4;
    _modelMatrix: Cesium.Matrix4;
    _command: Cesium.DrawCommand;
    _spSkyFromSpace: any;
    _spSkyFromAtmosphere: any;
    _flags: any;
    /**
     * The intensity of the light that is used for computing the sky atmosphere color.
     *
     * @type {number}
     * @default 50.0
     */
    atmosphereLightIntensity: number;
    /**
     * The Rayleigh scattering coefficient used in the atmospheric scattering equations for the sky atmosphere.
     *
     * @type {Cartesian3}
     * @default Cartesian3(5.5e-6, 13.0e-6, 28.4e-6)
     */
    atmosphereRayleighCoefficient: typeof Cesium.Cartesian3;
    /**
     * The Mie scattering coefficient used in the atmospheric scattering equations for the sky atmosphere.
     *
     * @type {Cartesian3}
     * @default Cartesian3(21e-6, 21e-6, 21e-6)
     */
    atmosphereMieCoefficient: typeof Cesium.Cartesian3;
    /**
     * The Rayleigh scale height used in the atmospheric scattering equations for the sky atmosphere, in meters.
     *
     * @type {number}
     * @default 10000.0
     */
    atmosphereRayleighScaleHeight: number;
    /**
     * The Mie scale height used in the atmospheric scattering equations for the sky atmosphere, in meters.
     *
     * @type {number}
     * @default 3200.0
     */
    atmosphereMieScaleHeight: number;
    /**
     * The anisotropy of the medium to consider for Mie scattering.
     * <p>
     * Valid values are between -1.0 and 1.0.
     * </p>
     * @type {number}
     * @default 0.9
     */
    atmosphereMieAnisotropy: number;
    /**
     * The hue shift to apply to the atmosphere. Defaults to 0.0 (no shift).
     * A hue shift of 1.0 indicates a complete rotation of the hues available.
     * @type {number}
     * @default 0.0
     */
    hueShift: number;
    /**
     * The saturation shift to apply to the atmosphere. Defaults to 0.0 (no shift).
     * A saturation shift of -1.0 is monochrome.
     * @type {number}
     * @default 0.0
     */
    saturationShift: number;
    /**
     * The brightness shift to apply to the atmosphere. Defaults to 0.0 (no shift).
     * A brightness shift of -1.0 is complete darkness, which will let space show through.
     * @type {number}
     * @default 0.0
     */
    brightnessShift: number;
    _hueSaturationBrightness: Cesium.Cartesian3;
    _radiiAndDynamicAtmosphereColor: Cesium.Cartesian3;
    private setDynamicLighting;
    private update;
    _sources: any;
    _cubeMap: any;
    _eunMatrix: any;
    _spSkyAtmosphere: any;
    /**
     * Returns true if this object was destroyed; otherwise, false.
     * <br /><br />
     * If this object was destroyed, it should not be used; calling any function other than
     * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
     *
     * @returns {boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
     *
     * @see SkyAtmosphere#destroy
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
     * skyAtmosphere = skyAtmosphere && skyAtmosphere.destroy();
     *
     * @see SkyAtmosphere#isDestroyed
     */
    destroy(): void;
}
import * as Cesium from "cesium";
