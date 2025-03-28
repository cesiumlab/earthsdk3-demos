import { ESUeViewer } from "../../index";
import { UeCloudViewerBase, UeEventsType, UeFuncType, UeFuncWithIdType } from "../../uemsg";
export type UeH5CallType = {
    t: 'c';
    n: number;
    tt: number;
    fs: UeFuncWithIdType[];
} & {
    callid: string;
};
/**
 * H5 UEViewer
 * 1.所有js发的消息通过callUeFunc存储在 数组_ueFuncWithIdAndResultCallbacks中等待轮询调用
 * 2._waitingUeFuncIdAndResultCallbacks 存储等待回调的函数，即发送了未收到回调的函数
 * 3.通过 window.ue.es.oncommand发送消息，多个消息可以拼接在一起发，一起发的消息存在_waitingUeCalls中，回调后移除
 * 4.通过 window.calljs 接收消息，收到消息_waitingUeFuncIdAndResultCallbacks对比，回调后移除
 * 5.区分对象和事件
 * @export
 * @class H5Viewer
 * @extends {UeCloudViewerBase}
 */
export declare class H5Viewer extends UeCloudViewerBase {
    private _ueViewer;
    private _ueFuncResultWithIdsEvent;
    private _ueFuncWithIdAndResultCallbacks;
    private _waitingUeFuncIdAndResultCallbacks;
    private _waitingUeCalls;
    private _ueEvent;
    /**
     * Creates an instance of H5Viewer.
     * @param {HTMLDivElement} container
     * @param {string} project
     * @param {string} [baseUrl= "${earthsdk3-ue-h5-assets-script-dir}" ]
     * @param {ESUeViewer} _ueViewer
     * @memberof H5Viewer
     */
    constructor(container: HTMLDivElement, project: string, baseUrl: string | undefined, _ueViewer: ESUeViewer);
    processResponse(text: string): void;
    callUeFunc<ResultType>(ueFunc: UeFuncType): Promise<ResultType>;
    disposableOnUeEvent<EventType extends keyof UeEventsType>(type: EventType, callback: (params: UeEventsType[EventType]) => void): () => void;
}
