import { Property } from 'earthsdk3';
import { ComponentInternalInstance } from 'vue';
export type PropertyCompCallbackFuncParamsType = {
    componentInstance: ComponentInternalInstance;
    property: Property,
    customEventName: string,
    otherParams?: any[],
};