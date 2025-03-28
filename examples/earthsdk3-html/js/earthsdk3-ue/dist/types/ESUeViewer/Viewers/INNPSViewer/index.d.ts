/**
 * inner PixelStream 内置像素流
 * ESSS V3.0.12 版本以后会附带 uselnternalSignallingServer 信息提供判断是否是内置信令服务器使用官方像素流
 * 1. 已有连接server 后 new PixelStreaming(...server)
 * 2. esmsg属性闲置
 * 3. 鼠标事件js自行收集
 *
 * {
    "server": "ws://localhost:9105",
    "instanceId": "c8806df8-7f39-4df2-bb35-b473c9063ec2",
    "esmsg": "ws://localhost:9107/esmsg",
    "status": "ok"，
    "uselnternalSignallingServer":true
}
 */
import { Event } from "xbsj-base";
import { ESUeViewer } from "../../index";
import { UeCloudViewerBase, UeEventsType, UeFuncType } from "../../uemsg";
import { WebRtcManagerWrapper } from "./WebRtcManagerWrapper";
export declare class INNPSViewer extends UeCloudViewerBase {
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
    resize(width: number, height: number): void;
    constructor(container: HTMLDivElement, wsUri: string, esmsgWsUri: string, _ueViewer: ESUeViewer);
    callUeFunc<ResultType>(ueFunc: UeFuncType): Promise<ResultType>;
    disposableOnUeEvent<EventType extends keyof UeEventsType>(type: EventType, callback: (params: UeEventsType[EventType]) => void): () => void;
}
