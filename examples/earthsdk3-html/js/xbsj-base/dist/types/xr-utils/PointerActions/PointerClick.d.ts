import { Destroyable } from "../base";
import { Event } from "../base";
/**
 * Cesium窗口的左键拖动会场景漫游交互的功能，如果再拖拽地球后，左键放开有点击效果，可能就不是相互想要的。
 * 这个类是为了分辨出用户使用左键的意图，如果只是点击不移动，就认为是真的点击操作；否则认为是拖动操作。
 * 但是发现另外一个问题，用户还是有可能在点击过程中有微弱移动鼠标的操作，这个操作用户自己感觉不出来，
 * 这样就会导致点击没反应的感觉。
 * 所以我还需要允许有点击过程中有微小的移动。
 */
export declare class PointerClick extends Destroyable {
    private _clickEvent;
    get clickEvent(): Event<[pointerEvent: PointerEvent]>;
    private _dbclickEvent;
    get dbclickEvent(): Event<[pointerEvent: PointerEvent]>;
    private _pointerdownEvent;
    private _pointerupEvent;
    private _pointermoveEvent;
    private _pointeroutEvent;
    pointerDown(pointerEvent: PointerEvent): void;
    pointerUp(pointerEvent: PointerEvent): void;
    pointerMove(pointerEvent: PointerEvent): void;
    pointerOut(pointerEvent: PointerEvent): void;
    dbClickDelayTime: number;
    nativeClickDelayTime: number;
    clickMovementTolerantPixelSize: number;
    debugging: boolean;
    private _enabled;
    get enabled(): boolean;
    set enabled(value: boolean);
    get enabledChanged(): import("../base").Listener<[boolean, boolean]>;
    constructor();
}
