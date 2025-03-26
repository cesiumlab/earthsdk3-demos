import { ESCesiumViewer } from "../../../ESCesiumViewer";
export declare function pickPosition(czmViewer: ESCesiumViewer, pointerEvent: PointerEvent, virtualHeight: number | undefined, result?: [number, number, number]): Promise<[number, number, number] | undefined>;
