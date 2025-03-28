import { ESJVector3D } from "earthsdk3";
import { Destroyable } from "xbsj-base";
import { MultiPointsEditing } from ".";
import { GeoCanvasMenuPoi } from "../../../index";
export declare class EditingPoint extends Destroyable {
    private _position;
    get position(): ESJVector3D | undefined;
    set position(value: ESJVector3D | undefined);
    get positionChanged(): import("xbsj-base").Listener<[ESJVector3D | undefined, ESJVector3D | undefined]>;
    private _id;
    get id(): number;
    private _menuPoi;
    get menuPoi(): GeoCanvasMenuPoi;
    constructor(multiPointsEditing: MultiPointsEditing, position?: ESJVector3D);
}
