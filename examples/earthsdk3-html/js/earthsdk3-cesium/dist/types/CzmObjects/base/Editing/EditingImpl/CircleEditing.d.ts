import { Destroyable, ReactParamsType } from "xbsj-base";
import { ESCesiumViewer } from "../../../../ESCesiumViewer";
export declare class CircleEditing extends Destroyable {
    private _centerReact;
    private _radiusReact;
    private _editingReact;
    private _czmViewer;
    get centerReact(): ReactParamsType<[number, number, number] | undefined, any>;
    get radiusReact(): ReactParamsType<number, any>;
    get editingReact(): ReactParamsType<boolean, any>;
    get czmViewer(): ESCesiumViewer;
    constructor(_centerReact: ReactParamsType<[number, number, number] | undefined>, _radiusReact: ReactParamsType<number>, _editingReact: ReactParamsType<boolean>, _czmViewer: ESCesiumViewer);
}
