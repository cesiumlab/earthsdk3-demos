import { JsonValue } from "xbsj-base";
import { ESJColor } from "./DataType";
import { ESJRenderType } from "./StrokeStyleType";
/**
 *  @description 点样式
 */
export type ESJPointStyle = {
    size: number;
    sizeType: ESJRenderType;
    color: ESJColor;
    material: string;
    materialParams: JsonValue;
};
