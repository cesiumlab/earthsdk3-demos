import { Destroyable, UniteChanged } from "xbsj-base";
import { ESCesiumViewer } from "../../index";
export declare class DepthOfField extends Destroyable {
    constructor(czmViewer: ESCesiumViewer);
}
export declare namespace DepthOfField {
    const createDefaultProps: () => {
        show: boolean;
        focalDistance: number;
        delta: number;
        sigma: number;
        stepSize: number;
    };
}
export interface DepthOfField extends UniteChanged<ReturnType<typeof DepthOfField.createDefaultProps>> {
}
