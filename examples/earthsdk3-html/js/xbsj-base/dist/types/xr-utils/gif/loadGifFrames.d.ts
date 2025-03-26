export declare function loadGifFrames(gifUrl: string): Promise<{
    gif: import("./gifuct-js").ParsedGif;
    gifFrames: import("./gifuct-js").ParsedFrame[];
    arrayBuffer: ArrayBuffer;
}>;
