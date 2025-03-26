import { ReactParamsType } from "xbsj-base";
import { ReactVarProperty } from "./ReactVarProperty";
import { DVT } from "./WithUndefinedProperty";
export declare class EnumProperty<ValueType> extends ReactVarProperty<ValueType | undefined> {
    private _enums;
    constructor(name: string, description: string, withUndefined: boolean, readonly: boolean, reactVar: ReactParamsType<ValueType | undefined>, _enums: [name: string, value: ValueType][], defaultValue?: DVT<ValueType>);
    get type(): string;
    get enums(): [name: string, value: ValueType][];
}
