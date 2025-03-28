import { JsonValue } from "xbsj-base";
/**
 *  @description 视口状态，'Raw'初始状态，'Creating'正在创建, 'Created'创建完成, 'Error'创建失败，'Reconnecting'重新连接中
 */
export type ViewerStatus = 'Raw' | 'Creating' | 'Created' | 'Error' | 'Reconnecting';
export type ESJSwitchToCesiumViewerOptionType = {
    container: HTMLDivElement | string;
    viewSync?: boolean;
    attributeSync?: boolean;
    destroy?: boolean;
};
export type ESJSwitchToUEViewerUrlOptionType = {
    container: HTMLDivElement | string;
    uri: string;
    app: string;
    token?: string;
    viewSync?: boolean;
    attributeSync?: boolean;
    destroy?: boolean;
};
export type ESJSwitchToUEViewerWsOptionType = {
    container: HTMLDivElement | string;
    ws: string;
    esmsg?: string;
    viewSync?: boolean;
    attributeSync?: boolean;
    destroy?: boolean;
};
export type ESJSwitchToUEViewerOptionType = ESJSwitchToUEViewerUrlOptionType | ESJSwitchToUEViewerWsOptionType;
type ESVOption = {
    container: HTMLDivElement | string;
    type: string;
    id?: string;
    options?: JsonValue;
};
export type ESVOptionUeUri = {
    type: 'ESUeViewer';
    container: HTMLDivElement | string;
    id?: string;
    options: {
        uri: string;
        app: string;
        token?: string;
    };
};
export type ESVOptionUeWs = {
    type: 'ESUeViewer';
    container: HTMLDivElement | string;
    id?: string;
    options: {
        ws: string;
        esmsg?: string;
        uselnternalSignallingServer?: boolean;
    };
};
export type ESVOptionUeHTML5 = {
    type: 'ESUeViewer';
    container: HTMLDivElement | string;
    id?: string;
    options: {
        project: string;
        baseUrl?: string;
    };
};
type ESVOptionCzm = {
    type: 'ESCesiumViewer';
    id?: string;
    container: HTMLDivElement | string;
    options?: JsonValue;
};
type ESVOptionUe = ESVOptionUeUri | ESVOptionUeWs | ESVOptionUeHTML5;
export { ESVOption, ESVOptionCzm, ESVOptionUe };
