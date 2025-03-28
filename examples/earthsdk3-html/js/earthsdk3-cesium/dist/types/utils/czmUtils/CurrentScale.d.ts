import { ESCesiumViewer } from "../../ESCesiumViewer";
import { Destroyable, ReactParamsType } from "xbsj-base";
export declare class CurrentScale extends Destroyable {
    constructor(czmViewer: ESCesiumViewer, positionReact: ReactParamsType, scaleReact: ReactParamsType, axisPixelSize: number);
}
