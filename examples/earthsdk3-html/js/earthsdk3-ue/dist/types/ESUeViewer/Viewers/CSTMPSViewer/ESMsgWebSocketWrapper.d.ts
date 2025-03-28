import { HasOwner } from "xbsj-base";
import { PSUEViewer } from "./PSUEViewer";
export declare class ESMsgWebSocketWrapper extends HasOwner<PSUEViewer> {
    private _uri;
    get esUeViewer(): PSUEViewer;
    private _processResponseFn;
    get uri(): string;
    private _inner;
    private _innerInit;
    get inner(): WebSocket;
    constructor(owner: PSUEViewer, _uri: string);
    sendInputData(data: ArrayBuffer): boolean | undefined;
    emitDescriptorWithString(messageType: number, descriptorAsString: string): void;
    destroyImpl(): void;
}
