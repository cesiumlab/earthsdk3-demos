import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { Destroyable } from 'xbsj-base';
import { ESMsgWebSocketWrapper } from './ESMsgWebSocketWrapper';
export declare class PSUEViewer extends Destroyable {
    private _domOrDomId;
    private _options;
    private _eventTarget;
    get eventTarget(): EventTarget;
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    dispatchEvent(event: Event): boolean;
    debug: boolean;
    private uiInteractionCallbacks;
    private _url;
    private _container;
    get container(): HTMLElement;
    private _pixelStream;
    get pixelStream(): PixelStreaming;
    private _esMsgWsWrapper?;
    private _esMsgWsWrapperInit;
    get esMsgWsWrapper(): ESMsgWebSocketWrapper | undefined;
    get esWebSocketReady(): boolean;
    constructor(_domOrDomId: HTMLDivElement | string, _options: {
        url: string;
        esmsgWsUri?: string | undefined;
        createUI?: boolean | undefined;
    });
    resolveCallback(text: string): boolean;
    processResponse(text: string): void;
    emitUIInteraction(descriptor: any, callback: any): void;
    private get webRtcController();
    private _pixelStreamEmitUIInteractionAsString;
    emitUIInteractionForBigData(descriptor: any, callback: any): void;
    emitCommand(descriptor: object): void;
    getVideoSize(): {
        width: number;
        height: number;
    };
    resizeUEVideo(x: number, y: number): void;
}
