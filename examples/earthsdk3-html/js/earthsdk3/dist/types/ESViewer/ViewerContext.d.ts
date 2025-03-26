import { Destroyable } from "xbsj-base";
import { ESViewer } from "./index";
import { ESVOption, ViewerObjsMap } from "../ESJTypes";
export declare class ViewerContext extends Destroyable {
    registerObjsMap: ViewerObjsMap;
    register<T extends ESViewer>(viewerType: string, viewerConstructor: new (option: ESVOption) => T): string;
    getViewerConstructor<T extends ESViewer>(viewerType: string): (new (option: ESVOption) => T) | undefined;
    createViewer<T extends ESViewer>(option: ESVOption): T;
}
