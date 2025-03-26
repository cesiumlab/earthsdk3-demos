export type CzmTimeIntervalCollectionJsonType = {
    type: 'fromIso8601';
    iso8601: string;
    isStartIncluded?: boolean;
    isStopIncluded?: boolean;
    leadingInterval?: boolean;
    trailingInterval?: boolean;
} | {
    type: 'fromIso8601DateArray';
    iso8601Dates?: string[];
    isStartIncluded?: boolean;
    isStopIncluded?: boolean;
    leadingInterval?: boolean;
    trailingInterval?: boolean;
};
