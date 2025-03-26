import { Ref, watch, ref } from "vue";

export function toRefKey(refValue: Ref<any>) {
    const key = ref(0);
    watch(refValue, () => key.value++)
    return key;
}
