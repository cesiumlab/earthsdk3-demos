import { Czm3DTiles, ESJResource } from ".";
import * as Cesium from "cesium";
export declare function createCzm3DTiles(sceneObject: Czm3DTiles, url: string | ESJResource, customShader?: Cesium.CustomShader): Promise<Cesium.Cesium3DTileset | undefined>;
