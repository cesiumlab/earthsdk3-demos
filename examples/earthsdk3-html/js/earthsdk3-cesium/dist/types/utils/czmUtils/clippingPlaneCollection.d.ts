import * as Cesium from 'cesium';
import { CzmClippingPlaneCollectionJsonType } from '../../ESJTypesCzm';
export declare function createClippingPlaneCollection(clippingPlanesJson: CzmClippingPlaneCollectionJsonType, originRootTransformInv?: Cesium.Matrix4): Cesium.ClippingPlaneCollection;
export declare function setClippingPlaneCollection(clippingPlanes: Cesium.ClippingPlaneCollection, clippingPlanesJson: CzmClippingPlaneCollectionJsonType | undefined, originRootTransformInv?: Cesium.Matrix4): void;
