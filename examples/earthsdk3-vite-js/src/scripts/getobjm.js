import { inject } from "vue";
export function getobjm() {
    const objm = inject('objm');
    if (!objm) throw new Error('ESObjectsManager not found');
    return objm;
}
