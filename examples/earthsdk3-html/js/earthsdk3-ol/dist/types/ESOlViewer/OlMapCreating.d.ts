import OlMap from 'ol/Map.js';
import { Destroyable } from 'xbsj-base';
import { ESOlViewer } from "./index";
export declare class OlMapCreating extends Destroyable {
    constructor(container: HTMLDivElement, olViewer: ESOlViewer, setViewer: (viewer: OlMap | undefined) => void);
}
