import { ESCesiumViewer } from "../../../../ESCesiumViewer";
import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class CzmGlobeMaterial extends Destroyable {
    static defaults: {
        show: boolean;
        enableContour: boolean;
        contourSpacing: number;
        contourWidth: number;
        contourColor: [number, number, number, number];
        shadingMode: string;
    };
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace CzmGlobeMaterial {
    const createDefaultProps: () => {
        show: boolean | undefined;
        shadingMode: "elevation" | "slope" | "aspect" | "none" | undefined;
        enableContour: boolean;
        contourSpacing: number;
        contourWidth: number;
        contourColor: [number, number, number, number];
    };
}
export interface CzmGlobeMaterial extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof CzmGlobeMaterial.createDefaultProps>> {
}
