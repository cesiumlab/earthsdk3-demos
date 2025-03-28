/**
 * custom PixelStream 自定义像素流
 * ESSS v3.0.0 版本以后，返回信息中会附带 instanceId 属性，默认开启独立通信+官方像素流
 * 1. 已有连接server 后 new PixelStreaming(...server) , 创建官方像素流
 * 2. esmsg会用来新建一个 new WebSocket(esmsg) 简称 esMsgWsWrapper;
 * 3. 利用 esMsgWsWrapper来覆盖官方像素流服务中的消息发送this.pixelStream._webRtcController.sendMessageController.dataChannelSender.sendData
 * 4. viewer的鼠标事件来自于UE消息
 *
 * {
    "server": "ws://localhost:9105",
    "instanceId": "c8806df8-7f39-4df2-bb35-b473c9063ec2",
    "esmsg": "ws://localhost:9107/esmsg",
    "status": "ok"
}
 */
import { Event } from "xbsj-base";
import { ESUeViewer } from "../../index";
import { PSUEViewerWrapper } from "./PSUEViewerWrapper";
import { UeCloudViewerBase, UeEventsType, UeFuncType } from "../../uemsg";
export declare class CSTMPSViewer extends UeCloudViewerBase {
    private _ueViewer;
    private _esueViewerWrapper;
    get esueViewerWrapper(): PSUEViewerWrapper;
    private _ueFuncResultWithIdsEvent;
    private _ueFuncWithIdAndResultCallbacks;
    private _waitingUeFuncIdAndResultCallbacks;
    private _waitingUeCalls;
    private _ueEvent;
    private _errorEvent;
    get errorEvent(): Event<[string]>;
    private _readyEvent;
    get readyEvent(): Event<[]>;
    private _esmsgwsopen;
    get esmsgwsopen(): boolean;
    set esmsgwsopen(value: boolean);
    get esmsgwsopenChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _videoinited;
    get videoinited(): boolean;
    set videoinited(value: boolean);
    get videoinitedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    private _webRtcConnected;
    get webRtcConnected(): boolean;
    set webRtcConnected(value: boolean);
    get webRtcConnectedChanged(): import("xbsj-base").Listener<[boolean, boolean]>;
    resize(width: number, height: number): void;
    constructor(container: HTMLDivElement, wsUri: string, esmsgWsUri: string | undefined, _ueViewer: ESUeViewer);
    callUeFunc<ResultType>(ueFunc: UeFuncType): Promise<ResultType>;
    disposableOnUeEvent<EventType extends keyof UeEventsType>(type: EventType, callback: (params: UeEventsType[EventType]) => void): () => void;
}
