import { ImageBaseInfo } from "../../../utils";
export declare function getModeImage(mode: string): Promise<{
    icon: ImageBaseInfo | undefined;
    anchor: ImageBaseInfo | undefined;
    iconBox: ImageBaseInfo | undefined;
    textBox: ImageBaseInfo[];
}>;
export declare function getESPoi2DDiv(mode: string, contentName: any, textBox: ImageBaseInfo[], iconBox: ImageBaseInfo | undefined, icon: ImageBaseInfo | undefined, anchor: ImageBaseInfo | undefined): {
    div: HTMLDivElement;
    styleObj: {
        img: string;
        icon: string;
        anchor: string;
        textBoxTransverseParent: string;
        textBoxTransverse: string;
        textBoxVertical: string;
        textBoxVerticalBrother: string;
    };
};
export declare function getESPoi2DCss(mode: string, _anchor: ImageBaseInfo | undefined, _iconBox: ImageBaseInfo | undefined, height: number): {
    poi2DCss: string;
    poi2DCssObj: {
        img: string;
        icon: string;
        anchor: string;
        textBoxTransverseParent: string;
        textBoxTransverse: string;
        textBoxVertical: string;
        textBoxVerticalBrother: string;
    };
};
export declare function getESPoi2DDivHeight(mode: string, _anchor: ImageBaseInfo | undefined, _iconBox: ImageBaseInfo | undefined): number | undefined;
export declare function getTransverseDiv(className: string, Images: any, contentName: any): string;
export declare function getVerticalDiv(className: string, images: any, contentName: any): string;
export declare function createTextDiv(textBox: ImageBaseInfo[]): {
    textDiv: string;
    height: number;
};
export declare function replaceStr(template: string, poi2DCssObj: {
    [xx: string]: any;
}, noReplace?: boolean): string;
