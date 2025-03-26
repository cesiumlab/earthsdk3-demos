import { ESCesiumViewer } from "../../../ESCesiumViewer";
import { Destroyable, ReactParamsType } from "xbsj-base";
import { PrsEditing } from "./EditingImpl";
export type CzmESPrsEditingOptionsType = {
    rotation?: {
        initialRotation?: [number, number, number];
        showHelper?: boolean;
    };
};
export declare class CzmESPrsEditing extends Destroyable {
    private _czmViewer;
    private _editing;
    private _positionReactParam;
    private _rotationReactParam;
    private _options?;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _innerPositionReact;
    private _esOptions;
    get esOptions(): CzmESPrsEditingOptionsType;
    private _prsEditingSetting;
    get prsEditing(): PrsEditing | undefined;
    constructor(_czmViewer: ESCesiumViewer, _editing: ReactParamsType<boolean> | undefined, _positionReactParam: ReactParamsType<[number, number, number] | undefined>, _rotationReactParam: ReactParamsType<[number, number, number] | undefined>, _options?: {
        rotation?: {
            initialRotation?: [number, number, number] | undefined;
            showHelper?: boolean | undefined;
        } | undefined;
    } | undefined);
}
