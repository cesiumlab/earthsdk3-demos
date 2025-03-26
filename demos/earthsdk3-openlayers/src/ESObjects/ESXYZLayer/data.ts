import { defaultColorValue, sampleColorValue } from "../base/colorManipulation/Color";

export const description = {
    url: `URL template.Must include { x }, { y } or { -y }, and { z } placeholders.A {?-?} template pattern, for example subdomain{ a- f}.domain.com, may be used instead of defining each one separately in the urls option.`,
    urls: `An array of URLs. Requests will be distributed among the URLs in this array.`,
    attributions: `Attributions`,
    attributionsCollapsible: `true,Attributions are collapsible.`,
    cacheSize: `Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.`,
    crossOrigin: `The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data with the Canvas renderer. See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.`,
    interpolate: `true,Use interpolated values when resampling. By default, linear interpolation is used when resampling. Set to false to use the nearest neighbor instead.`,
    opaque: `boolean(defaults to false) Whether the layer is opaque.`,
    tileGrid: `Tile grid.`,
    projection: `Projection. defaults to 'EPSG:3857'`,
    reprojectionErrorThreshold: `0.5,Maximum allowed reprojection error (in pixels). Higher values can increase reprojection performance, but decrease precision.`,
    maxZoom: `number(defaults to 42) Optional max zoom level.Not used if tileGrid is provided.`,
    minZoom: `number(defaults to 0)	Optional min zoom level.Not used if tileGrid is provided.`,
    maxResolution: `number | undefined,Optional tile grid resolution at level zero.Not used if tileGrid is provided.`,
    tilePixelRatio: `1,The pixel ratio used by the tile service. For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px by 512px images (for retina/hidpi devices) then tilePixelRatio should be set to 2.`,
    tileLoadFunction: `Optional function to load a tile given a URL. The default is function(imageTile, src) {imageTile.getImage().src = src;};`,
    wrapX: `false,Whether to wrap the world horizontally.`,
    tileSize: `(defaults to[256, 256])The tile size used by the tile service.Not used if tileGrid is provided.`,
    gutter: `number(defaults to 0)The size in pixels of the gutter around image tiles to ignore.This allows artifacts of rendering at tile edges to be ignored.Supported images should be wider and taller than the tile size by a value of 2 x gutter.`,
    tileUrlFunction: `Optional function to get tile URL given a tile coordinate and the projection.Required if url or urls are not provided.`,
    transition: `Duration of the opacity transition for rendering. To disable the opacity transition, pass transition: 0.`,
    zDirection: `0	Choose whether to use tiles with a higher or lower zoom level when between integer zoom levels. See getZForResolution`,
    ...sampleColorValue
}

export const defaults = {
    maxZoom: 42,
    minZoom: 0,
    opaque: false,
    tileSize: 256,
    gutter: 0,
    interpolate: true,
    attributionsCollapsible: true,
    reprojectionErrorThreshold: 0.5,
    tilePixelRatio: 1,
    tileLoadFunction: `function(imageTile, src) {imageTile.getImage().src = src;}`,
    wrapX: true,
    transition: 250,
    zDirection: 0,
    ...defaultColorValue,
}

