import { inject } from "vue";
import { ESObjectsManager } from "earthsdk3";

export function getobjm() {
    const objm = inject('objm');
    if (!objm) throw new Error('ESObjectsManager not found');
    return objm as ESObjectsManager;
}
