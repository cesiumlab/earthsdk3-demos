import { Destroyable, Event } from "xbsj-base";
import { WebRtcManager } from "./WebRtcManager";
export declare class WebRtcManagerWrapper extends Destroyable {
    private _container;
    private _wsuri;
    private _esmsgWsUri?;
    private _instance;
    get instance(): WebRtcManager;
    private _event;
    get event(): Event<[eventName: string, eventDetailStr: string]>;
    get debug(): boolean;
    set debug(value: boolean);
    constructor(_container: HTMLDivElement, _wsuri: string, _esmsgWsUri?: string | undefined);
    emitUIInteractionForBigData(params: any, callback?: (...params: any[]) => void): Promise<any[]>;
    getVideoSize(): {
        width: number;
        height: number;
    };
    resize(width: number, height: number): void;
}
