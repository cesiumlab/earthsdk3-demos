import { ESJVector3D } from "earthsdk3";
import { MultiPointsAppendEditing } from ".";
import { EditingPoint } from "../EditingPoint";
export declare class AddEditingPoint extends EditingPoint {
    constructor(multiPointsAppendEditing: MultiPointsAppendEditing, position?: ESJVector3D);
}
