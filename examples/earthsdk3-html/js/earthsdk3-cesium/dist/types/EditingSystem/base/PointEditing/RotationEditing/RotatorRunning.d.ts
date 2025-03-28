import { HasOwner } from "xbsj-base";
import { RotationEditing } from ".";
export declare class RotatorRunning extends HasOwner<RotationEditing> {
    constructor(owner: RotationEditing);
    private _createRotatorMoveProcessing;
    private _pickPlane;
    private _getStartInfo;
}
