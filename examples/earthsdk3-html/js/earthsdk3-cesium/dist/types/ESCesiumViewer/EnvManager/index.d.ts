import { Destroyable } from "xbsj-base";
import { ESCesiumViewer } from "../index";
import { Clouds } from "./Clouds";
import { DepthOfField } from "./DepthOfField";
import { Fog } from "./Fog";
import { Rain } from "./Rain";
import { Snow } from "./Snow";
export declare class EnvManager extends Destroyable {
    rain: Rain;
    cloud: Clouds;
    snow: Snow;
    fog: Fog;
    depthOfField: DepthOfField;
    constructor(czmViewer: ESCesiumViewer);
}
