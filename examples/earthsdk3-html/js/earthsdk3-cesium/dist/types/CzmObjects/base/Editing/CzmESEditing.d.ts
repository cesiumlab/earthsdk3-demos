import { PositionEditing } from "../../../CzmObjects";
import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, ReactParamsType } from "xbsj-base";
export declare class CzmESEditing extends Destroyable {
    private _czmViewer;
    private _editing;
    private _positionReactParam;
    private _innerPositionReact;
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing;
    constructor(_czmViewer: ESCesiumViewer, _editing: ReactParamsType<boolean> | undefined, _positionReactParam: ReactParamsType<[number, number, number] | undefined>);
}
