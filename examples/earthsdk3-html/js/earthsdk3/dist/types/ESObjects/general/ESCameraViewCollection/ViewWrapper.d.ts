import { Destroyable } from "xbsj-base";
import { ESJViewInfo } from "../../../ESJTypes";
import { ESCameraView } from "../ESCameraView";
import { ESCameraViewCollection } from "./index";
export type ViewOption = {
    size: [number, number];
    name: string;
};
export declare class ViewWrapper extends Destroyable {
    private _view;
    get view(): ESCameraView;
    get viewInfo(): ESJViewInfo;
    constructor(sceneObject: ESCameraViewCollection, viewInfo?: ESJViewInfo, option?: ViewOption);
}
