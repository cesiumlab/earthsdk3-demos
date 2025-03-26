import { ESCesiumViewer } from "../../ESCesiumViewer";
import { Destroyable, JsonValue } from "xbsj-base";
export declare function createInnerClassFromJson<T extends Destroyable>(ObjJson: JsonValue & {
    type: string;
    [k: string]: any;
}, objClass: new (czmViewer: ESCesiumViewer) => T, czmViewer: ESCesiumViewer): T;
