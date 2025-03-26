import { Destroyable } from "xbsj-base";
import { ESViewer } from "./index";
/**
 * 视口上的自定义鼠标交互,从ESViewer.container上收集鼠标事件,并触发到ESViewer相关事件
 */
export declare class ViewerCustomInteraction extends Destroyable {
    private _viewer;
    constructor(_viewer: ESViewer, dom: HTMLDivElement);
}
