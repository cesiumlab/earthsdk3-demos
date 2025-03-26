import { Destroyable } from "xbsj-base";
import { ESUeViewer } from "../index";
import { UeCloudViewerBase } from "../uemsg/UeCloudViewerBase";
export declare class ViewerInstance extends Destroyable {
    constructor(ueViewer: ESUeViewer, cloudViewer: UeCloudViewerBase);
}
