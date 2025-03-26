import { UeEventsType } from "./UeEventsType";
import { UeFuncsType } from "./UeFuncsType";
export type UeFuncType = {
    [Key in keyof UeFuncsType]: {
        f: Key;
        p: UeFuncsType[Key]['params'];
    };
}[keyof UeFuncsType];
export type UeFuncWithIdType = UeFuncType & {
    fid: string;
};
export type UeFuncResultType = {
    [Key in keyof UeFuncsType]: {
        f: Key;
        r: UeFuncsType[Key]['result'];
    };
}[keyof UeFuncsType];
export type UeFuncResultWithIdType = UeFuncResultType & {
    fid: string;
};
export type UeEventResultType = {
    [Key in keyof UeEventsType]: UeEventsType[Key];
}[keyof UeEventsType];
export type UeCallType = {
    t: 'c';
    n: number;
    tt: number;
    fs: UeFuncWithIdType[];
};
export type UeCallWithIdType = UeCallType & {
    callid: string;
};
export type UeCallAcceptedType = {
    callid: string;
    [k: string]: any;
};
export type UeCallResultType = {
    t: 'cr';
    frs: UeFuncResultWithIdType[];
    ers: UeEventResultType[];
};
