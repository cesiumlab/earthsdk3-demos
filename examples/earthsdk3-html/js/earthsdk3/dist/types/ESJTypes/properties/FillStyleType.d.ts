import { JsonValue } from "xbsj-base";
import { ESJColor } from "./DataType";
/**
 * @description  面样式
 */
export type ESJFillStyle = {
    ground: boolean;
    color: ESJColor;
    material: string;
    materialParams: JsonValue;
};
