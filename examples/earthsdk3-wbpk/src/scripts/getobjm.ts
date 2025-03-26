import { inject } from "vue";
import MyESObjectsManager from "./MyESObjectsManager";

export function getobjm() {
    const objm = inject('objm');
    if (!objm) throw new Error('ESObjectsManager not found');
    return objm as MyESObjectsManager;
}
