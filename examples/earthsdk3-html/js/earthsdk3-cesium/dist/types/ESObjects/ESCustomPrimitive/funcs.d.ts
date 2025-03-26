import { CzmAttributesType, CzmIndexType } from "../../ESJTypesCzm";
import { AttributesJsonType, IndexJsonType } from "./types";
export declare function attributesToAttributesJson(attributes: CzmAttributesType): AttributesJsonType;
export declare function attributesJsonToAttributes(attributesJson: AttributesJsonType): CzmAttributesType;
export declare function indexToIndexJson(indexTypedArray: CzmIndexType): IndexJsonType;
export declare function indexJsonToIndex(indexJson: IndexJsonType): Uint8Array | Uint16Array | Uint32Array;
