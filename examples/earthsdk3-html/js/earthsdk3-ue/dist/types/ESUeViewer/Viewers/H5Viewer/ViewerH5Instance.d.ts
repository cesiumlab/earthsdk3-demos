import { Destroyable } from "xbsj-base";
import { ESUeViewer } from "../../index";
import { UeCloudViewerBase } from "../../uemsg";
export declare class ViewerH5Instance extends Destroyable {
    constructor(container: HTMLDivElement, ueViewer: ESUeViewer, cloudViewer: UeCloudViewerBase);
}
