import { Destroyable, ReactParamsType } from "xbsj-base";
import { PositionEditing } from "./PositionEditing";
import { RotationEditing } from "./RotationEditing";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export type PrsEditingMode = 'Position' | 'Rotation' | 'None';
export declare class PrsEditing extends Destroyable {
    private _positionReactParam;
    private _rotationReactParam;
    private _prsEditingReact;
    private _sceneObjectOrViewer;
    private _options?;
    private _editingMode;
    private _editingChanging;
    private _editingModeInit;
    get editingMode(): PrsEditingMode;
    set editingMode(value: PrsEditingMode);
    get editingModeChanged(): import("xbsj-base").Listener<[PrsEditingMode, PrsEditingMode]>;
    switch(): void;
    private _positionEditingReact;
    private _rotationEditingReact;
    private _sPositionEditing;
    get sPositionEditing(): PositionEditing;
    private _sRotationEditing;
    get sRotationEditing(): RotationEditing;
    constructor(_positionReactParam: ReactParamsType<[number, number, number] | undefined>, _rotationReactParam: ReactParamsType<[number, number, number] | undefined>, _prsEditingReact: ReactParamsType<boolean> | undefined, _sceneObjectOrViewer: ESCesiumViewer, _options?: {
        rotation?: {
            initialRotation?: [number, number, number] | undefined;
            showHelper?: boolean | undefined;
        } | undefined;
    } | undefined);
}
