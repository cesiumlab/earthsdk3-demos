import { Destroyable } from "xbsj-base";
import { ESViewer } from "./index";
export declare class ContainerStyleController extends Destroyable {
    private _subContainer;
    private _overlayContainer;
    private _viewer;
    constructor(_subContainer: HTMLDivElement, _overlayContainer: HTMLDivElement, _viewer: ESViewer);
}
