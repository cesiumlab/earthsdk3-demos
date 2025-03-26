export type XbsjRoutePath = {
    positions: ([number, number] | [number, number, number])[];
    width: number;
    [k: string]: any;
} | {
    startPos: [number, number, number];
    endPos: [number, number, number];
    heightRatio: number;
    width: number;
    [k: string]: any;
};
