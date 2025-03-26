export type ImageBaseInfo = {
    width: number;
    height: number;
    url: string;
    base64: string;
};
export declare function imgUrlToBase64(imgUrl: string): Promise<ImageBaseInfo | undefined>;
