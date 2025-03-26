import { Event } from "xbsj-base";
import { ESUeViewer } from "../index";
import { UeCloudViewerBase } from "../uemsg/UeCloudViewerBase";
import { UeEventsType } from "../uemsg/UeEventsType";
import { UeFuncType } from "../uemsg/UeMessage";
import { WebRtcManagerWrapper } from "./WebRtcManagerWrapper";
/**
 * UE5云渲染
 */
export declare class UeCloudViewer extends UeCloudViewerBase {
    private _ueViewer;
    private _videoInitialized;
    get videoInitialized(): boolean;
    private _webRtcConnected;
    get webRtcConnected(): boolean;
    private _webSocketOpen;
    get webSocketOpen(): boolean;
    private _ue5ViewerWrapper;
    get ue5ViewerWrapper(): WebRtcManagerWrapper;
    private _ueFuncResultWithIdsEvent;
    private _ueFuncWithIdAndResultCallbacks;
    private _waitingUeFuncIdAndResultCallbacks;
    private _waitingUeCalls;
    private _ueEvent;
    private _errorEvent;
    get errorEvent(): Event<[string]>;
    private _readyEvent;
    get readyEvent(): Event<[]>;
    constructor(container: HTMLDivElement, wsUri: string, esmsgWsUri: string, _ueViewer: ESUeViewer);
    callUeFunc<ResultType>(ueFunc: UeFuncType): Promise<ResultType>;
    disposableOnUeEvent<EventType extends keyof UeEventsType>(type: EventType, callback: (params: UeEventsType[EventType]) => void): () => void;
}
