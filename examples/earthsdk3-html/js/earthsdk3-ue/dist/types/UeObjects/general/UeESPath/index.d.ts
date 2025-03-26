import { ESPath } from "earthsdk3";
import { ESUeViewer } from "../../../ESUeViewer";
import { UeESGeoVector } from "../../base";
export declare class UeESPath<T extends ESPath = ESPath> extends UeESGeoVector<T> {
    static readonly type: void;
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        materialMode: null;
        pointStyle: (val: import("earthsdk3").ESJPointStyle) => {
            materialParams: string;
            size: number;
            sizeType: import("earthsdk3").ESJRenderType;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
        strokeStyle: (val: import("earthsdk3").ESJStrokeStyle) => {
            materialParams: string;
            ground: boolean;
            width: number;
            widthType: import("earthsdk3").ESJRenderType;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
        fillStyle: (val: import("earthsdk3").ESJFillStyle) => {
            materialParams: string;
            ground: boolean;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
    };
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
