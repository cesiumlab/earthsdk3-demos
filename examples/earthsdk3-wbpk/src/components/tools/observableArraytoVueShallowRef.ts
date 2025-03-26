import { shallowRef } from "vue";
import { Destroyable, ObservableArray } from "xbsj-base";
import { setVueRefDisposeFunc } from "./toVueRef";

export function observableArraytoVueShallowRef<T>(observableArray: ObservableArray<T>) {
    const vueShallowRef = shallowRef([...observableArray]);

    const disposer = new Destroyable();
    const unlinkFunc = () => !disposer.isDestroyed() && disposer.destroy();

    disposer.dispose(observableArray.changedEvent.dwon(observableArray => {
        vueShallowRef.value = [...observableArray];
    }));
    // disposer.dispose(observableArray.changedEvent.toDestroyEvent.disposableOn(unlinkFunc));
    setVueRefDisposeFunc(vueShallowRef, unlinkFunc);
    return vueShallowRef;
}
