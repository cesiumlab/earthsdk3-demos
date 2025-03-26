import { ReactParamsType } from "xbsj-base";
import { ReactVarProperty } from "./ReactVarProperty";
import { DVT } from "./WithUndefinedProperty";
export declare class EnumStringsProperty extends ReactVarProperty<string[] | undefined> {
    private _enums;
    constructor(name: string, description: string, withUndefined: boolean, readonly: boolean, reactVar: ReactParamsType<string[] | undefined>, _enums: [name: string, value: string][], defaultValue?: DVT<string[] | undefined>);
    get type(): string;
    get enums(): [name: string, value: string][];
}
