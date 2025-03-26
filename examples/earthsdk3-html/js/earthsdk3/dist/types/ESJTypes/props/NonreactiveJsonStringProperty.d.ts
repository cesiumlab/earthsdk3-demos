import { DVT, WithUndefinedProperty } from "./WithUndefinedProperty";
/**
 * 非响应式Json字符串属性
 */
export declare class NonreactiveJsonStringProperty extends WithUndefinedProperty<string> {
    private _getJsonStringFunc;
    private _setJsonStringFunc;
    constructor(name: string, description: string, withUndefined: boolean, readonly: boolean, _getJsonStringFunc: () => string | undefined, _setJsonStringFunc: (value: string | undefined) => void, defaultValue?: DVT<string>);
    get type(): string;
    get getJsonStringFunc(): () => string | undefined;
    get setJsonStringFunc(): (value: string | undefined) => void;
}
