export declare function extendComponentProps<T extends {
    [k: string]: {
        defaultValue: any;
        componentName: string;
        originPropName?: string;
    };
}>(owner: Object, componentProps: T): void;
export declare function getDefaultComponentProps<T extends {
    [k: string]: {
        defaultValue: any;
        componentName: string;
        originPropName?: string;
    };
}>(componentConfigs: T): { [k in keyof T]: T[k]["defaultValue"]; };
