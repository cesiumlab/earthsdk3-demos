import * as Cesium from 'cesium';
import { CzmImageryProviderJsonType } from '../../../../ESJTypesCzm';
import { ESCesiumViewer } from '../../../../ESCesiumViewer';
export declare function needRecreate(oldImageryProviderJson: CzmImageryProviderJsonType | undefined, newImageryProviderJson: CzmImageryProviderJsonType | undefined): boolean;
export declare function createImageryProviderFromJson(imageryProviderJson: CzmImageryProviderJsonType, czmViewer: ESCesiumViewer): Promise<Cesium.ImageryProvider | undefined>;
export declare function updateImageryProviderFromJson(imageryProvider: Cesium.ImageryProvider, imageryProviderJson: CzmImageryProviderJsonType): void;
