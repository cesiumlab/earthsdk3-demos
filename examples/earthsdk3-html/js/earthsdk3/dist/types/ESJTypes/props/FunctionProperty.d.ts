import { ParamsProperty } from "./ParamsProperty";
import { Property } from "./Property";
type ParamTypes = ('string' | 'number' | 'boolean' | 'strings' | 'numbers' | 'booleans' | ['string' | 'number' | 'boolean' | 'strings' | 'numbers' | 'booleans', string])[];
export declare class FunctionProperty<ParamsType extends (string | number | boolean | string[] | number[] | boolean[])[]> extends Property {
    private _func;
    private _paramsProperty;
    private _getValueFunc;
    constructor(name: string, description: string, paramTypes: ParamTypes, _func: (...args: ParamsType) => void, defaultParams: ParamsType);
    get paramsProperty(): ParamsProperty<ParamsType>;
    exec(): void;
    get type(): string;
}
export {};
