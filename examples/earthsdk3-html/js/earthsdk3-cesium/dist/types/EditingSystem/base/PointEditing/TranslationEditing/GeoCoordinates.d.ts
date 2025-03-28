import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
import { ESJVector3D, ESJVector4D } from "earthsdk3";
import { ESCesiumViewer } from "../../../../index";
/**
 * 坐标架,通过箭头线实现
 */
export declare class GeoCoordinates extends Destroyable {
    static defaults: {
        position: ESJVector3D;
        heading: number;
        dimensions: ESJVector3D;
        xAxisColor: ESJVector4D;
        yAxisColor: ESJVector4D;
        zAxisColor: ESJVector4D;
    };
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace GeoCoordinates {
    const createDefaultProps: () => {
        show: boolean;
        position: import("xbsj-base").ReactiveVariable<ESJVector3D | undefined>;
        heading: number;
        dimensions: import("xbsj-base").ReactiveVariable<ESJVector3D>;
        xAxisColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        yAxisColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        zAxisColor: import("xbsj-base").ReactiveVariable<ESJVector4D>;
        xAxisShow: boolean;
        yAxisShow: boolean;
        zAxisShow: boolean;
    };
}
export interface GeoCoordinates extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoCoordinates.createDefaultProps>> {
}
