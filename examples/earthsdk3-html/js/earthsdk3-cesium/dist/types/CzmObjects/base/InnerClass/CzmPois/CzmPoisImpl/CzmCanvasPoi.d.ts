import { CanvasPoi, CanvasPrimitivesContext, Event } from "xbsj-base";
import { CzmBasePoi } from "./CzmBasePoi";
import { CzmPoisContext } from "./CzmPoisContext";
import { WinPosFromCartesian } from "../../../../../utils";
export declare class CzmCanvasPoi<T extends CanvasPoi> extends CzmBasePoi {
    private _canvasPoi;
    _zOrderChanged?: Event;
    _zOrder: number | undefined;
    depth: number;
    constructor(canvasPoiClass: new (canvasPrimitivesContext: CanvasPrimitivesContext) => T, czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    get canvasPoi(): T;
    set zOrder(value: number | undefined);
    get zOrder(): number | undefined;
    get zOrderChanged(): Event<[]>;
}
