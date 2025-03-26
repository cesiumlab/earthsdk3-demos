import { ESGeoVector, ESJFillStyle, ESJPointStyle, ESJStrokeStyle } from "earthsdk3";
import { UeESVisualObject } from "../UeESVisualObject";
import { ESUeViewer } from "../../../ESUeViewer";
export declare class UeESGeoVector<T extends ESGeoVector = ESGeoVector> extends UeESVisualObject<T> {
    static forceUeUpdateProps: string[];
    static propValFuncs: {
        pointStyle: (val: ESJPointStyle) => {
            materialParams: string;
            size: number;
            sizeType: import("earthsdk3").ESJRenderType;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
        strokeStyle: (val: ESJStrokeStyle) => {
            materialParams: string;
            ground: boolean;
            width: number;
            widthType: import("earthsdk3").ESJRenderType;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
        fillStyle: (val: ESJFillStyle) => {
            materialParams: string;
            ground: boolean;
            color: import("earthsdk3").ESJColor;
            material: string;
        };
    };
    constructor(sceneObject: T, ueViewer: ESUeViewer);
}
