import { ESJFlyInParam, ESJFlyToParam, ESJPickedInfo } from "../../ESJTypes";
import { Event, Listener, UniteChanged } from "xbsj-base";
import { ESSceneObject } from "./ESSceneObject";
import { ESViewer } from "../../ESViewer";
export declare abstract class ESVisualObject extends ESSceneObject {
    /**
         * 弃用变量管理器
         * 请勿使用该属性
         */
    _deprecated: ({
        [k: string]: any;
    } | string)[];
    /**
      * 弃用变量管理器
      * 请勿使用该方法
      */
    _deprecatedWarning(): void;
    static _lastFlyInId: number;
    private _flyInEvent;
    get flyInEvent(): Listener<[duration: number, id: number]>;
    flyIn(duration?: number): void;
    static _lastFlyToId: number;
    private _flyToEvent;
    get flyToEvent(): Listener<[duration: number, id: number]>;
    flyTo(duration?: number): void;
    private _flyOverEvent;
    get flyOverEvent(): Event<[id: number, mode: "error" | "cancelled" | "over", viewer: ESViewer]>;
    private _pickedEvent;
    get pickedEvent(): Event<[ESJPickedInfo]>;
    private _calcFlyToParamEvent;
    get calcFlyToParamEvent(): Listener;
    calcFlyToParam(): void;
    private _calcFlyInParamEvent;
    get calcFlyInParamEvent(): Listener;
    calcFlyInParam(): void;
    emptyFlyToParam(): void;
    emptyFlyInParam(): void;
    /**
     * 是否使用ESObjectWithLocation类中的calcFlyToParam
     */
    useCalcFlyToParamInESObjectWithLocation: boolean;
    static defaults: {
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: ESJFlyToParam;
        flyInParam: ESJFlyInParam;
    };
    getESProperties(): {
        defaultMenu: string;
        general: import("../../ESJTypes").Property[];
        basic: import("../../ESJTypes").Property[];
        dataSource: import("../../ESJTypes").Property[];
        location: import("../../ESJTypes").Property[];
        coordinate: import("../../ESJTypes").Property[];
        style: import("../../ESJTypes").Property[];
    };
    getProperties(language?: string): import("../../ESJTypes").Property[];
    get flyToDistance(): number | undefined;
    get flyToHeading(): number | undefined;
    get flyToPitch(): number | undefined;
    get flyToFlyDuration(): number | undefined;
    get flyToHDelta(): number | undefined;
    get flyToPDelta(): number | undefined;
    get flyToDistanceChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    get flyToHeadingChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    get flyToPitchChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    get flyToFlyDurationChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    get flyToHDeltaChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    get flyToPDeltaChanged(): Listener<[ESJFlyToParam | undefined, ESJFlyToParam | undefined]>;
    set flyToDistance(value: number | undefined);
    set flyToHeading(value: number | undefined);
    set flyToPitch(value: number | undefined);
    set flyToFlyDuration(value: number | undefined);
    set flyToHDelta(value: number | undefined);
    set flyToPDelta(value: number | undefined);
}
export declare namespace ESVisualObject {
    const createDefaultProps: () => {
        /**
         * https://www.wolai.com/earthsdk/u1sLHxcj6PErXf8ubcvC4j#aV7NLcX7GfjAvfEJwY3qVR
         */
        show: boolean;
        collision: boolean;
        allowPicking: boolean;
        flyToParam: import("xbsj-base").ReactiveVariable<ESJFlyToParam | undefined>;
        flyInParam: import("xbsj-base").ReactiveVariable<ESJFlyInParam | undefined>;
        name: string;
        ref: string | undefined;
        extras: import("xbsj-base").ReactiveVariable<import("xbsj-base").JsonValue>;
        devTags: import("xbsj-base").ReactiveVariable<string[] | undefined>;
        execOnceFuncStr: string | undefined;
        updateFuncStr: string | undefined;
        toDestroyFuncStr: string | undefined;
    };
}
export interface ESVisualObject extends UniteChanged<ReturnType<typeof ESVisualObject.createDefaultProps>> {
}
