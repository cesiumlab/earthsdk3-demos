import { ReactVarProperty } from "./ReactVarProperty";
import { ReactParamsType } from "xbsj-base";
import { DVT } from "./WithUndefinedProperty";
export declare class EvalStringProperty extends ReactVarProperty<string | undefined> {
    private _sampleValue?;
    constructor(name: string, description: string, withUndefined: boolean, readonly: boolean, reactVar: ReactParamsType<string | undefined>, defaultValue?: DVT<string | undefined> | undefined, _sampleValue?: string | undefined);
    get sampleValue(): string | undefined;
    get type(): string;
}
