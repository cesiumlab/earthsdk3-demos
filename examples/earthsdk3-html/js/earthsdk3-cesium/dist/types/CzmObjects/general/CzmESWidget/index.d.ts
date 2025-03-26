import { ESWidget } from "earthsdk3";
import { CzmESLabel } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare class CzmESWidget extends CzmESLabel<ESWidget> {
    static readonly type: void;
    private _widgetTemp;
    get widgetTemp(): any;
    set widgetTemp(val: any);
    constructor(sceneObject: ESWidget, czmViewer: ESCesiumViewer);
    flyTo(duration: number | undefined, id: number): boolean;
}
