import { ESCesiumViewer } from '../index';
export declare function getCenterResolution(czmViewer: ESCesiumViewer): Promise<[number, [number, number, number]] | undefined>;
export declare function getZoomFromResolution(resolution: number): number;
