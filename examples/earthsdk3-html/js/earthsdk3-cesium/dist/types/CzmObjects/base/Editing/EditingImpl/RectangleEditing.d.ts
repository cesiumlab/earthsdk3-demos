import { Destroyable, ReactParamsType } from 'xbsj-base';
import { ESCesiumViewer } from '../../../../ESCesiumViewer';
export declare class RectangleEditing extends Destroyable {
    private _heightReact;
    private _rectangleReact;
    private _editingReact;
    private _pointEditingReact;
    private _czmViewer;
    get heightReact(): ReactParamsType<number, any>;
    get rectangleReact(): ReactParamsType<[number, number, number, number] | undefined, any>;
    get editingReact(): ReactParamsType<boolean, any>;
    get pointEditingReact(): ReactParamsType<boolean, any>;
    get czmViewer(): ESCesiumViewer;
    constructor(_heightReact: ReactParamsType<number>, _rectangleReact: ReactParamsType<[number, number, number, number] | undefined>, _editingReact: ReactParamsType<boolean>, _pointEditingReact: ReactParamsType<boolean>, _czmViewer: ESCesiumViewer);
}
