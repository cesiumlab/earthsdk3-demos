import { Destroyable, Event } from "xbsj-base";
import { ESUeViewer } from "../../ESUeViewer";
/**
 * H5 容器
 * @export
 * @class DLViewer
 * @extends {Destroyable}
 */
export declare class DLViewer extends Destroyable {
    private _ueViewer;
    private _onRuntimeInitialized;
    get onRuntimeInitialized(): Event<[]>;
    private _vIframe;
    get vIframe(): HTMLIFrameElement | null;
    /**
     * Creates an instance of DLViewer.
     * @param {HTMLDivElement} container
     * @param {string} project
     * @param {string} baseUrl
     * @param {ESUeViewer} _ueViewer
     * @memberof DLViewer
     */
    constructor(container: HTMLDivElement, project: string, baseUrl: string, _ueViewer: ESUeViewer);
}
