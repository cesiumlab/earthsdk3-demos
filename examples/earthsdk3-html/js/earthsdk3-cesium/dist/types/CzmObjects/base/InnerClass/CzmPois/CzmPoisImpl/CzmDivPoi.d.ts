import { WinPosFromCartesian } from "../../../../../utils";
import { Destroyable, DivPoi, FloatDiv, Event } from "xbsj-base";
import { CzmPoisContext } from "./CzmPoisContext";
import * as Cesium from "cesium";
export type IconDetailSwitchPoiStyle = 'canvas' | 'div';
export declare class CzmDivPoi<T extends FloatDiv> extends Destroyable {
    private _czmPoisContext;
    _divPoi: DivPoi<T>;
    _show: boolean;
    _occludedByEarth: boolean;
    _winPosFromCartesian: WinPosFromCartesian;
    _zOrderChanged?: Event;
    _zOrder: number | undefined;
    depth: number;
    constructor(customDivClass: new () => T, _czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    get divPoi(): DivPoi<T>;
    _updateShow(): void;
    set cartesian(value: Cesium.Cartesian3);
    get cartesian(): Cesium.Cartesian3;
    get winPosFromCartesian(): WinPosFromCartesian;
    set show(value: boolean);
    get show(): boolean;
    set zOrder(value: number | undefined);
    get zOrder(): number | undefined;
    get zOrderChanged(): Event<[]>;
}
