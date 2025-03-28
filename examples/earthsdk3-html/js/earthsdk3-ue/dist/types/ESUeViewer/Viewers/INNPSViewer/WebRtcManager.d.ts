import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Destroyable, Event } from "xbsj-base";
export declare class WebRtcManager extends Destroyable {
    private _container;
    private _option;
    debug: boolean;
    private _error;
    get error(): Event<["webRtcDisconnected" | "webRtcFailed" | "webSocketClose" | "webSocketError"]>;
    private _connected;
    get connected(): Event<["videoInitialized" | "webRtcConnected" | "webSocketOpen"]>;
    private _ueevent;
    get ueevent(): Event<[string]>;
    get container(): HTMLDivElement;
    private _pixelStream;
    get pixelStream(): PixelStreaming;
    get webSocketReady(): boolean;
    processResponse(text: string): void;
    emitUIInteractionForBigData(descriptor: {
        [k: string]: any;
    }, callback: any): void;
    sendData(descriptorAsString: string): void;
    constructor(_container: HTMLDivElement | string, _option: {
        ws: string;
        esmsg?: string;
    });
    private uiInteractionCallbacks;
    resolveCallback(text: string): boolean;
    getVideoSize(): {
        width: number;
        height: number;
    };
    emitCommand(descriptor: object): void;
    emitUIInteraction(): void;
    resizeUEVideo(x: number, y: number): void;
}
