import { ESPathImpl } from ".";
import { CurrentInfoType } from "./CurrentInfoType";
export type GetCurrentFuncType = (timeStamp: number, geoPath: ESPathImpl) => CurrentInfoType | undefined;
