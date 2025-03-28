import { MultiPointsModifyEditing } from ".";
import { EditingPoint } from "../EditingPoint";
import { ESJVector3D } from "earthsdk3";
export declare class ModifyEditingPoint extends EditingPoint {
    constructor(multiPointsModifyEditing: MultiPointsModifyEditing, position?: ESJVector3D);
}
