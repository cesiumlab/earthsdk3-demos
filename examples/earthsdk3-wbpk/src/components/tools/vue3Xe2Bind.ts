import { Ref, watch } from 'vue';
import { createVueDisposer } from './createVueDisposer';
import { toVueRefWithoutUndefined } from './toVueRef';
import { Destroyable, ReactParamsType } from "xbsj-base";

/**
 * vue3响应式变量相互绑定
 * @param left 
 * @param right 
 * @returns 
 */
export function vue3Bind<T extends number | boolean | string>(left: Ref<T>, right: Ref<T>) {
    left.value = right.value;
    const unWatch1 = watch(left, () => right.value = left.value);
    const unWatch2 = watch(right, () => left.value = right.value);
    const unBindFunc = () => {
        unWatch1();
        unWatch2();
    }
    return unBindFunc;
}

/**
 * 将一个已存在的vue3响应式变量和xe2的响应式变量绑定
 * 注意只能针对js的primitive type
 * @param vueProp 
 * @param reactVar 
 * @param defaultValue 
 * @returns 
 */
export function vue3Xe2Bind<T extends number | boolean | string>(vueProp: Ref<T>, reactVar: ReactParamsType<T | undefined>, defaultValue: T) {
    const disposer = new Destroyable();
    const vd = createVueDisposer(disposer.dispose.bind(disposer));
    const czmAlpha = toVueRefWithoutUndefined<T>(vd, reactVar, defaultValue);
    disposer.dispose(vue3Bind<T>(vueProp, czmAlpha));
    return () => disposer.destroy();
}
