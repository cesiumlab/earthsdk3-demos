import { EngineObject } from "../../EngineObject";
import { ESSceneObject } from "../../ESObjects";
import { ESViewer } from "../../ESViewer";
import { JsonValue } from "xbsj-base";
import { Property } from "../props";
import { SceneTreeJsonValue } from "../../utils";
import { ESJVector2D, ESJVector3D } from "./DataType";
import { ESVOption } from "./Viewer";
export * from './Viewer';
export * from './FlyParamType';
export * from './ParticleEmitterJsonType';
export * from './DataType';
export * from './FillStyleType';
export * from './StrokeStyleType';
export * from './PointStyleType';
export * from './ESJResource';
export * from './ClockType';
export * from './ESJArcType';
/**
 * @description pick拾取信息体
 */
export type ESJViewInfo = {
    viewDistance?: number | undefined;
    duration?: number | undefined;
    position: ESJVector3D;
    rotation?: ESJVector3D | undefined;
    thumbnail?: string | undefined;
    name?: string | undefined;
};
export type ViewerObjsMap = Map<string, new (option: ESVOption) => ESViewer>;
export type EngineObjsMap = Map<string, new (sceneObject: ESSceneObject, viewer: ESViewer) => EngineObject>;
/**
 * @description  属性类型 ,UI上会按照分类展示
 * @type {ESJProperty}
 * @param defaultMenu 默认菜单栏 'basic' | 'general' | 'dataSource' | 'location' | 'coordinate' | 'style'
 * @param basic 基础属性
 * @param general 通用属性
 * @param dataSource 数据源属性
 * @param location 位置属性
 * @param coordinate 坐标属性
 * @param style 样式属性
 */
export type ESPropertiesType = {
    defaultMenu: string;
    basic: Property[];
    general: Property[];
    dataSource: Property[];
    location: Property[];
    coordinate: Property[];
    style: Property[];
};
export type ESJsonObjectType = {
    [key: string]: any;
};
/**
 *   @param DECIMAL_DEGREE   度格式，dd.ddddd°
 *   @param DEGREES_DECIMAL_MINUTES  度分格式，dd°mm.mmm'
 *   @param SEXAGESIMAL_DEGREE  度分秒格式，dd°mm'ss"
 */
export type ESJLonLatFormatType = 'DECIMAL_DEGREE' | 'DEGREES_DECIMAL_MINUTES' | 'SEXAGESIMAL_DEGREE';
export declare enum ESJLonLatFormat {
    DECIMAL_DEGREE = "DECIMAL_DEGREE",
    DEGREES_DECIMAL_MINUTES = "DEGREES_DECIMAL_MINUTES",
    SEXAGESIMAL_DEGREE = "SEXAGESIMAL_DEGREE"
}
/**
 * @description 基础状态信息
 * @type {ESJBasicInfoType}
 * @param fps 帧率
 * @param position 相机位置
 * @param rotation 相机姿态
 * @param length 比例尺
 */
export type ESJStatusInfoType = {
    fps: number;
    position: ESJVector3D;
    rotation: ESJVector3D;
    length: number;
};
/**
 * @description 导航模式
 * @type {ESJNavigationMode}
 * @param Map 地图模式
 * @param Walk 步行模式
 * @param Line 线路模式
 * @param UserDefined 自定义模式
 * @param RotateGlobe 旋转地球模式
 * @param RotatePoint 旋转点模式
 * @param Follow 跟随模式
 */
export type ESJNavigationMode = "Map" | "Walk" | "Line" | "UserDefined" | "RotateGlobe" | "RotatePoint" | "Follow";
export type ESObjectsManagerJsonType = {
    asset: {
        type: string;
        version: string;
        createdTime: string;
        modifiedTime: string;
        name: string;
    };
    viewers?: JsonValue;
    sceneTree?: SceneTreeJsonValue;
    viewCollection?: ESJViewInfo[];
    lastView?: ESJViewInfo;
};
export type ESJWidgetEventInfo = {
    type: "leftClick" | "rightClick" | "mouseEnter" | "mouseLeave" | "childMouseLeave" | "childMouseEnter";
    add?: {
        children?: string[];
        mousePos?: ESJVector2D;
    };
};
