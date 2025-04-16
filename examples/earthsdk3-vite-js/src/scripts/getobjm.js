import { inject } from "vue";
/**
 * 获取ESObjectsManager
 * @returns {ESObjectsManager}
 */
export function getobjm() {
    const objm = inject('objm');
    if (!objm) throw new Error('ESObjectsManager not found');
    return objm;
}
