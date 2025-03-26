import { Destroyable } from "xbsj-base";
import { ESUeViewer } from "../index";
import { UeCloudViewerBase } from "../uemsg/UeCloudViewerBase";
export declare class ViewerLocalInstance extends Destroyable {
    constructor(container: HTMLDivElement, ueViewer: ESUeViewer, cloudViewer: UeCloudViewerBase);
}
