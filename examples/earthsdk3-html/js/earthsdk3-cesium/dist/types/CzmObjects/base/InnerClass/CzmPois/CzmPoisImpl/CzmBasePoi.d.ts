import { WinPosFromCartesian } from "../../../../../utils";
import { Destroyable } from "xbsj-base";
import { CzmPoisContext } from "./CzmPoisContext";
import * as Cesium from 'cesium';
export declare class CzmBasePoi extends Destroyable {
    protected _czmPoisContext: CzmPoisContext;
    private _show;
    private _winPosFromCartesian;
    private _near;
    private _far;
    private _actualShow;
    constructor(_czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    protected get actualShowChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    protected get actualShow(): boolean;
    set cartesian(value: Cesium.Cartesian3);
    get cartesian(): Cesium.Cartesian3;
    get winPosFromCartesian(): WinPosFromCartesian;
    set show(value: boolean);
    get show(): boolean;
    set near(value: number);
    get near(): number;
    set far(value: number);
    get far(): number;
}
