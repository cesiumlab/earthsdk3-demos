import { inject } from "vue";
import type { VisObjectsManager } from "./VisObjectsManager";

export function getobjm() {
    const objm = inject('objm');
    if (!objm) throw new Error('VisObjectsManager not found');
    return objm as VisObjectsManager;
}
