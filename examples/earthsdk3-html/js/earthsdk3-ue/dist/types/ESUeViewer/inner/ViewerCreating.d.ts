import { ESVOptionUe } from "earthsdk3";
import { Destroyable } from "xbsj-base";
import { ESUeViewer } from "../index";
export declare class ViewerCreating extends Destroyable {
    private _reconnectEvent;
    constructor(container: HTMLDivElement, params: ESVOptionUe, ueViewer: ESUeViewer);
}
