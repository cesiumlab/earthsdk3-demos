/**
 *
 * @param centerPosition
 * @param heading
 * @param position
 * @param result result是两个元素的数组，第一个表示distance >0 表示和箭头方向一致，否则相反；第二个表示位置
 * @returns
 */
export declare function geoNeareastPointOnRhumbLine(centerPosition: [number, number, number], heading: number, position: [number, number, number], result?: [number, number, number]): [number, [number, number, number] | undefined];
export declare function createHelperLine(centerPosition: [number, number, number], heading: number, dimension: number): [number, number, number][];
export declare function geoNeareastPointOnRhumbLine2(line: ([number, number, number] | [number, number])[], position: [number, number, number]): import("earthsdk3").ESJVector3D;
