import { ESCesiumViewer } from "../../ESCesiumViewer";
import { Destroyable, ReactParamsType } from "xbsj-base";
/**
 * 用来显示设置屏幕像素以后程序自动计算的缩放值
 */
export declare class CurrentSceneScalePoi extends Destroyable {
    constructor(czmViewer: ESCesiumViewer, showSceneScaleReact: ReactParamsType<boolean | undefined>, positionReact: ReactParamsType<[number, number, number] | undefined>, sceneScaleFromPixelSize: ReactParamsType<number | undefined>);
}
