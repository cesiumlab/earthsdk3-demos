import * as Cesium from 'cesium';
export declare class TextureGaussianSplatting extends Cesium.Texture {
    constructor(options: any);
    fromFramebuffer: (options: any) => TextureGaussianSplatting;
    copyFrom: (options: any) => void;
    copyFromFramebuffer: (xOffset: any, yOffset: any, framebufferXOffset: any, framebufferYOffset: any, width: any, height: any) => void;
    generateMipmap: (hint: any) => void;
}
