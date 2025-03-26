import { Destroyable } from "xbsj-base";
import { ContainerStyleController } from "./ContainerStyleController";
import { ESViewer } from "./index";
export declare class ViewerContainer extends Destroyable {
    private _container;
    private _viewer;
    private _subContainer;
    get subContainer(): HTMLDivElement;
    private _overlayContainer;
    get overlayContainer(): HTMLDivElement;
    private _containerStyleController;
    get containerStyleController(): ContainerStyleController;
    get container(): HTMLDivElement;
    constructor(_container: HTMLDivElement, _viewer: ESViewer);
}
