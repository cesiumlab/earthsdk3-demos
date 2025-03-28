import { Destroyable, ReactivePropsToNativePropsAndChanged } from "xbsj-base";
export declare class Editing extends Destroyable {
    static defaults: {
        enabled: boolean;
    };
    constructor();
}
export declare namespace Editing {
    const createDefaultProps: () => {
        enabled: boolean;
    };
}
export interface Editing extends ReactivePropsToNativePropsAndChanged<ReturnType<typeof Editing.createDefaultProps>> {
}
