import { Property } from 'earthsdk3';
import { ComponentInternalInstance } from 'vue';

export type PropertyCompCallbackFuncParamsType = {
    componentInstance: ComponentInternalInstance;
    property: any
    customEventName: string,
    otherParams?: any[],
};
