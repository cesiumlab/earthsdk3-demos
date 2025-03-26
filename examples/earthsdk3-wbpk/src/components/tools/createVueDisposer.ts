import { Ref } from "vue";
import { Destroyable } from "xbsj-base";
import { destroyVueRef } from "./toVueRef";

export class VueRefDisposer extends Destroyable {
    disposeVueRef<T>(vueRef: Ref<T>) {
        this.dispose(() => destroyVueRef(vueRef));
        return vueRef;
    }
    dvr<T>(vueRef: Ref<T>) { return this.disposeVueRef(vueRef); }
}

export function createVueDisposer(disposeFunc: (df: () => void) => void) {
    const disposer = new VueRefDisposer();
    disposeFunc(() => disposer.destroy());
    return disposer;
}
