import * as Cesium from 'cesium';
import { CzmMaterialJsonType } from '../../ESJTypesCzm';
import { ReactParamsType } from 'xbsj-base';
export declare function createMaterialFromJson(materialJson: CzmMaterialJsonType): Cesium.Material;
export declare function updateMaterialFromJson(material: Cesium.Material, materialJson: CzmMaterialJsonType): void;
export declare function createMaterialRef(reactMaterialParams: ReactParamsType<CzmMaterialJsonType | undefined>, defaultMaterialJson?: CzmMaterialJsonType): import("xbsj-base").ReactiveVariable<Cesium.Material | undefined>;
