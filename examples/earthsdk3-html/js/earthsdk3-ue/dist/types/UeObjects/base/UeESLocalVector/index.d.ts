import { UeESObjectWithLocation } from '../UeESObjectWithLocation';
import { ESUeViewer } from '../../../ESUeViewer';
import { ESJFillStyle, ESJPointStyle, ESJStrokeStyle, ESLocalVector } from "earthsdk3";
export declare class UeESLocalVector<T extends ESLocalVector = ESLocalVector> extends UeESObjectWithLocation<T> {
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
