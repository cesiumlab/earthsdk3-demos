declare function getSystemAndArch(): {
    os: string;
    arch: string;
};
declare const startRunningTime: number;
declare function sendProductUsageInfo(copyright: any): void;
declare let copyright: {
    readonly owner: any;
    readonly ownerlink: any;
    readonly gituri: any;
    readonly info: string;
    readonly date: any;
    readonly author: any;
    readonly version: any;
    readonly name: any;
    readonly commitId: any;
    print(): void;
} | undefined;
