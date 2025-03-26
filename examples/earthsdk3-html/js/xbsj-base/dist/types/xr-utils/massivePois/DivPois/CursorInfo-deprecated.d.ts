import { Destroyable } from "../../base";
export declare class CursorInfo extends Destroyable {
    _infoDiv: HTMLDivElement;
    _text: string;
    constructor(container: HTMLDivElement);
    set text(value: string);
    get text(): string;
}
