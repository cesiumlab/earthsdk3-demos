import { JsonValue } from "xbsj-base";
import { ESJColor } from "./DataType";
/**
 * @description 渲染类型 真实世界类型 和 屏幕像素类型
 */
export type ESJRenderType = "world" | "screen";
/**
 *  @description 线样式
 */
export type ESJStrokeStyle = {
    ground: boolean;
    width: number;
    widthType: ESJRenderType;
    color: ESJColor;
    material: string;
    materialParams: JsonValue;
};
