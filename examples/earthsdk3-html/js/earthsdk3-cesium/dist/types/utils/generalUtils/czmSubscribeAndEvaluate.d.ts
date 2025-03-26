export declare function czmSubscribeAndEvaluate<PropType = any, T extends {
    [k: string]: any;
} = any>(owner: T, observablePropertyName: keyof T, callback: (value: PropType, oldValue: PropType) => void, target?: Object, event?: string): () => any;
