import { HasOwner } from "xbsj-base";
import { RotationEditing } from ".";
import * as Cesium from 'cesium';
export declare class BasePlane extends HasOwner<RotationEditing> {
    get viewer(): Cesium.Viewer;
    get scene(): Cesium.Scene;
    get sceneObject(): RotationEditing;
    protected _valid: boolean;
    get valid(): boolean;
    protected _normal: Cesium.Cartesian3;
    get normal(): Cesium.Cartesian3;
    protected _origin: Cesium.Cartesian3;
    get origin(): false | Cesium.Cartesian3;
    constructor(owner: RotationEditing);
    /**
     * 获取鼠标点与平面之间的交点
     * @param windowPos 鼠标位置
     * @returns
     */
    pick(windowPos: [number, number]): Cesium.Cartesian3 | undefined;
}
export declare class HeadingPlane extends BasePlane {
    constructor(owner: RotationEditing);
}
export declare class PitchPlane extends BasePlane {
    constructor(owner: RotationEditing);
}
export declare class RollPlane extends BasePlane {
    constructor(owner: RotationEditing);
}
