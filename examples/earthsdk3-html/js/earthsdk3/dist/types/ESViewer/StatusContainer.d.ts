import { Destroyable } from "xbsj-base";
import { ESViewer } from "./index";
export declare class StatusContainer extends Destroyable {
    static defaults: {
        load: string;
        succeed: string;
        failure: string;
    };
    constructor(viewer: ESViewer);
}
