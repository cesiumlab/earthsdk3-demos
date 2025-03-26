import { Property } from "./Property";
export declare class GroupProperty extends Property {
    private _children;
    constructor(name: string, description: string, _children: Property[]);
    get type(): string;
    get children(): Property[];
}
