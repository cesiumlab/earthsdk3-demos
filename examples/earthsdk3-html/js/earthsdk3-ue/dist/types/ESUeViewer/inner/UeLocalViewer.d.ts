import { UeCloudViewerBase } from "../uemsg/UeCloudViewerBase";
import { UeFuncType } from "../uemsg/UeMessage";
import { ESUeViewer } from "../index";
import { UeEventsType } from "../uemsg/UeEventsType";
/**
 * 本地UEViewer
 */
export declare class UeLocalViewer extends UeCloudViewerBase {
    private _ueViewer;
    private _ueFuncResultWithIdsEvent;
    private _ueFuncWithIdAndResultCallbacks;
    private _waitingUeFuncIdAndResultCallbacks;
    private _waitingUeCalls;
    private _ueEvent;
    constructor(container: HTMLDivElement, _ueViewer: ESUeViewer);
    callUeFunc<ResultType>(ueFunc: UeFuncType): Promise<ResultType>;
    disposableOnUeEvent<EventType extends keyof UeEventsType>(type: EventType, callback: (params: UeEventsType[EventType]) => void): () => void;
}
