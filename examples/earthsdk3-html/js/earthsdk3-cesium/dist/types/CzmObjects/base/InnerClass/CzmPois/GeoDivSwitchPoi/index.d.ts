import { ESCesiumViewer } from "../../../../../ESCesiumViewer";
import { Destroyable, Listener, ReactivePropsToNativePropsAndChanged, SceneObjectKey } from "xbsj-base";
export declare class GeoDivSwitchPoi extends Destroyable {
    private _flyToEvent;
    get flyToEvent(): Listener<[number | undefined]>;
    flyTo(duration?: number): void;
    constructor(czmViewer: ESCesiumViewer, id?: SceneObjectKey);
    static defaults: {
        text: string;
    };
}
export declare namespace GeoDivSwitchPoi {
    const createDefaultProps: () => {
        show: boolean;
        position: import("xbsj-base").ReactiveVariable<[number, number, number] | undefined>;
        text: string | undefined;
        editing: boolean;
        showIcon: boolean;
        size: number[];
        originRatioAndOffset: import("xbsj-base").ReactiveVariable<[leftRatio: number, topRatio: number, leftOffset: number, topOffset: number]>;
        uri: string;
        zOrder: number;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface GeoDivSwitchPoi extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof GeoDivSwitchPoi.createDefaultProps>> {
}
