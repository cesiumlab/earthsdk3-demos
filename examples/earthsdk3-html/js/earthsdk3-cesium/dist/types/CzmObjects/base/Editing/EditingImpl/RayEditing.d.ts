import { Destroyable, ReactParamsType } from "xbsj-base";
import { ESCesiumViewer } from "./../../../../ESCesiumViewer";
export declare class RayEditing extends Destroyable {
    private _originReact;
    private _rotationReact;
    private _distanceReact;
    private _editingReact;
    private _components;
    get originReact(): ReactParamsType<[number, number, number] | undefined, any>;
    get rotationReact(): ReactParamsType<[number, number, number], any>;
    get distanceReact(): ReactParamsType<number, any>;
    get editingReact(): ReactParamsType<boolean, any>;
    get components(): ESCesiumViewer;
    constructor(_originReact: ReactParamsType<[number, number, number] | undefined>, _rotationReact: ReactParamsType<[number, number, number]>, _distanceReact: ReactParamsType<number>, _editingReact: ReactParamsType<boolean>, _components: ESCesiumViewer);
}
