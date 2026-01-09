// import { ES3DTileset, ESImageryLayer, ESTerrainLayer } from "earthsdk3";

// export function getCzmCodeFromCzmTerrain(czmTerrain: ESTerrainLayer) {
//     if (!czmTerrain.url) return undefined;
//     return `
//     var terrainProvider = new Cesium.CesiumTerrainProvider({
//         url: ${getFinalTerrainProviderUrlString(typeof czmTerrain.url == 'object' ? czmTerrain.url.url : czmTerrain.url)},
//     });
//     viewer.terrainProvider = terrainProvider;
//     viewer.camera.flyTo({
//         destination: Cesium.Rectangle.fromDegrees(west, south, east, north)
//     });
//         `;
// }
// export function getCzmCodeFromESImageryLayer(imagery: ESImageryLayer) {
//     if (!imagery.url) return undefined;
//     const finalUrl = SceneObject.context.getStrFromEnv(typeof imagery.url == 'string' ? imagery.url : imagery.url.url);

//     const configs: string[] = [];

//     configs.push(`url: '${finalUrl}'`);
//     const providerName = finalUrl.endsWith('.xml') ? 'TileMapServiceImageryProvider' : 'UrlTemplateImageryProvider';

//     const czmCode = `\
//     var imageryProvider = new Cesium.${providerName}({
//     ${configs.map(e => `    ${e}`).join(', \n')}
//     });
//     viewer.imageryLayers.addImageryProvider(imageryProvider);
//     viewer.camera.flyTo({
//         destination: Cesium.Rectangle.fromDegrees(west, south, east, north)
//     });
//     \
//     `;
//     return czmCode;
// }
// export function getCzmCodeFromES3DTileset(eS3DTileset: ES3DTileset) {
//     if (!eS3DTileset.url) return undefined;
//     const finalUrl = getFinalCzm3DTilesUrlString(eS3DTileset.url);
//     return `\
//         (async function () {
//             var tileset = await Cesium.Cesium3DTileset.fromUrl(
//                 ${finalUrl}
//             );
//             viewer.scene.primitives.add(tileset);
//             viewer.flyTo(tileset);
//             return tileset;
//         })();
//         `;
// }
