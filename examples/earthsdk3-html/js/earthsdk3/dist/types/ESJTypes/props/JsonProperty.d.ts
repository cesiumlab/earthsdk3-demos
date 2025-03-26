import { JsonValue, ReactParamsType } from "xbsj-base";
import { ReactVarProperty } from "./ReactVarProperty";
import { DVT } from "./WithUndefinedProperty";
export declare class JsonProperty<T extends JsonValue> extends ReactVarProperty<T> {
    private _sampleValue?;
    constructor(name: string, description: string, withUndefined: boolean, readonly: boolean, reactVar: ReactParamsType<T>, defaultValue?: DVT<T> | undefined, _sampleValue?: string | undefined);
    get sampleValue(): string | undefined;
    get type(): string;
}
