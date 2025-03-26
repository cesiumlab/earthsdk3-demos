import * as Cesium from 'cesium';
import { ResourceHandler } from "./ResourceHandler";
type CzmTexture = Cesium.Texture;
export * from './ResourceHandler';
export * from './createTextureFromImage';
export declare class SharedTexturePool {
    private _context;
    _map: Map<string, ResourceHandler<CzmTexture>>;
    _loadingMap: Map<string, Promise<ResourceHandler<CzmTexture>>>;
    constructor(_context: Cesium.Context);
    getTextureHandler(imageUrl: string): ResourceHandler<Cesium.Texture> | Promise<ResourceHandler<Cesium.Texture>>;
    clearUnused(): void;
}
export declare function getSharedTexturePool(context: Cesium.Context): SharedTexturePool;
export * from './ResourceHandler';
