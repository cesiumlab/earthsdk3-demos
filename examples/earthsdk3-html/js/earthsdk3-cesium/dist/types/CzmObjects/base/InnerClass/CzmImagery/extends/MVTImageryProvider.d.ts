import { Credit, Event, WebMercatorTilingScheme, DefaultProxy, GeographicTilingScheme, Resource, ImageryLayerFeatureInfo } from "cesium";
import { MVTImageryProviderOptions, StyleSpecification } from "./type";
declare class MVTImageryProvider {
    mapboxRenderer: any;
    ready: boolean;
    readyPromise?: Promise<boolean>;
    rectangle: any;
    tileSize: number;
    tileWidth: number;
    tileHeight: number;
    maximumLevel: number;
    minimumLevel: number;
    tileDiscardPolicy: undefined;
    credit: Credit;
    proxy: DefaultProxy;
    layerStyle: {
        [xx: string]: any;
    }[];
    hasAlphaChannel: boolean;
    sourceFilter: any;
    tilingScheme: WebMercatorTilingScheme | GeographicTilingScheme;
    private _destroyed;
    private _error;
    private _style;
    private _accessToken;
    private _enablePickFeatures;
    /**
     * create a MVTImageryProvider Object
     * @param {MVTImageryProviderOptions} options MVTImageryProvider options as follow:
     * @param {Resource | string | StyleSpecification} options.style - mapbox style object or url Resource.
     * @param {string} options.accessToken - mapbox style accessToken.
     * @param {RequestTransformFunction} options.transformRequest - use transformRequest to modify tile requests.
     * @param {Number} [options.tileSize = 256] - can be 256 or 512. defaults to 256.
     * @param {Number} [options.maximumLevel = 18] - if cesium zoom level exceeds maximumLevel, layer will be invisible, defaults to 18.
     * @param {Number} [options.minimumLevel = 0] - if cesium zoom level belows minimumLevel, layer will be invisible, defaults to 0.
     * @param {Boolean} [options.showCanvas = false] - if show canvas for debug.
     * @param {Boolean} [options.enablePickFeatures = true] - enable pickFeatures or not, defaults to true.
     * @param {Function} options.sourceFilter - sourceFilter is used to filter which source participate in pickFeature process.
     * @param {WebMercatorTilingScheme | GeographicTilingScheme} [options.tilingScheme = WebMercatorTilingScheme] - Cesium tilingScheme, defaults to WebMercatorTilingScheme(EPSG: 3857).
     * @param {Credit} options.credit - A credit contains data pertaining to how to display attributions/credits for certain content on the screen.
     * @example
     * const imageryProvider = new MVTImageryProvider({
          style: 'https://demotiles.maplibre.org/style.json'
        });
     */
    constructor(options: MVTImageryProviderOptions & {
        /**
         * Deprecated
         *
         * You can use fromUrl instead
         * @example
         * const provider = await MVTImageryProvider.fromUrl(url)
         */
        style: string | Resource | StyleSpecification;
    });
    /**
     * get mapbox style json obj
     */
    get style(): StyleSpecification | undefined;
    get isDestroyed(): boolean;
    /**
     * Gets an event that will be raised if an error is encountered during processing.
     * @memberof GeoJsonDataSource.prototype
     * @type {Event}
     */
    get errorEvent(): Event<(...args: any[]) => void>;
    private _build;
    static fromUrl(url: Resource | string | StyleSpecification, options?: MVTImageryProviderOptions): Promise<MVTImageryProvider>;
    private _preLoad;
    private _createTile;
    /**
     * reset tile cache
     */
    private _resetTileCache;
    private _getTilesSpec;
    requestImage(x: number, y: number, level: number, releaseTile?: boolean): Promise<HTMLImageElement | HTMLCanvasElement | any> | undefined;
    pickFeatures(x: number, y: number, zoom: number, longitude: number, latitude: number): Promise<ImageryLayerFeatureInfo[] | undefined> | undefined;
    destroy(): void;
}
export default MVTImageryProvider;
