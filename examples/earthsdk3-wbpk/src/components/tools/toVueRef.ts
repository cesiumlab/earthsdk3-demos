import { Ref, ref, ShallowRef, shallowRef, UnwrapRef, watch } from "vue";
import { Destroyable, getReactFuncs, getExtProp, ReactParamsType, setExtProp } from "xbsj-base";
import { VueRefDisposer } from "./createVueDisposer";

function _toVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(reactVar: ReactParamsType<Xe2ValueType>, readonly: boolean, toVueValue: ((s: Xe2ValueType) => VueValueType) | undefined, toXe2Value: ((s: VueValueType) => Xe2ValueType) | undefined, shallow: true): ShallowRef<VueValueType>;
function _toVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(reactVar: ReactParamsType<Xe2ValueType>, readonly: boolean, toVueValue: ((s: Xe2ValueType) => VueValueType) | undefined, toXe2Value: ((s: VueValueType) => Xe2ValueType) | undefined, shallow: false): Ref<VueValueType>;
function _toVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(reactVar: ReactParamsType<Xe2ValueType>, readonly: boolean, toVueValue: ((s: Xe2ValueType) => VueValueType) | undefined, toXe2Value: ((s: VueValueType) => Xe2ValueType) | undefined, shallow: boolean) {
    const [getValue, setValue, valueChanged] = getReactFuncs<Xe2ValueType>(reactVar);

    const defaultValue = getValue() as Xe2ValueType;
    const vueRef = !shallow ? ref<VueValueType>(toVueValue ? toVueValue(defaultValue) : defaultValue as unknown as VueValueType) : shallowRef<VueValueType>(defaultValue as unknown as VueValueType);
    const disposer = new Destroyable();
    const unlinkFunc = () => !disposer.isDestroyed() && disposer.destroy();


    if (!readonly) {
        disposer.dispose(watch(vueRef, val => {
            const vueValue = val as unknown as VueValueType;
            setValue(toXe2Value ? toXe2Value(vueValue) : (vueValue as unknown as Xe2ValueType));
        }, { deep: !!toVueValue }));
    }

    if (valueChanged) {
        disposer.dispose(valueChanged.dwon(() => {
            const xe2Value = getValue();
            vueRef.value = toVueValue ? toVueValue(xe2Value) : (xe2Value as unknown as VueValueType);
        }));
    }

    setVueRefDisposeFunc(vueRef, unlinkFunc);

    return vueRef;
}

export function setVueRefDisposeFunc(vueRef: Ref<any>, disposeFunc: () => void) {
    setExtProp(vueRef, '_vueRefDisposeFunc', disposeFunc);
}

export function getVueRefDisposeFunc(vueRef: Ref<any>) {
    return getExtProp<() => void>(vueRef, '_vueRefDisposeFunc');
}

export function destroyVueRef(vueRef: Ref<any>) {
    const disposeFunc = getVueRefDisposeFunc(vueRef);
    if (disposeFunc) {
        disposeFunc();
    } else {
        console.warn(`cannot find disposeFunc from vueRef!`);
    }
}

function _toVueRefWithoutUndefined<T>(reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc: ((v: T) => T) | undefined, readonly: boolean, shallow: true): ShallowRef<T>;
function _toVueRefWithoutUndefined<T>(reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc: ((v: T) => T) | undefined, readonly: boolean, shallow: false): Ref<T>;
function _toVueRefWithoutUndefined<T>(reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc: ((v: T) => T) | undefined, readonly: boolean, shallow: boolean) {
    const [getValue] = getReactFuncs<T | undefined>(reactVar);
    if (shallow) {
        return _toVueRef<T | undefined, T>(
            reactVar,
            readonly,
            v => cloneVueValueFunc ? cloneVueValueFunc(v ?? defaultValue) : (v ?? defaultValue),
            s => (s === defaultValue && getValue() === undefined) ? undefined : s,
            true,
        );
    } else {
        return _toVueRef<T | undefined, T>(
            reactVar,
            readonly,
            v => cloneVueValueFunc ? cloneVueValueFunc(v ?? defaultValue) : (v ?? defaultValue),
            s => (s === defaultValue && getValue() === undefined) ? undefined : s,
            false,
        );
    }
}

/**
 * 用来将xe2的响应式变量转变成vue3的响应式变量
 * @example
 * const d = createVueDisposer(onBeforeUnmount);
 * const propUiTreeRef = toReadonlyVueRef<PropUiTree | undefined>(d, [propUiTreeManager, 'propUiTree']);
 * const showSceneTreeViewRef = toVR<boolean>(d, [projectManager, "showSceneTreeView"])
 * const showPlayerViewRef = toVR<boolean>(d, [projectManager, "showPlayerView"])
 */
export function toVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(disposer: VueRefDisposer, reactVar: ReactParamsType<Xe2ValueType>, toVueValue?: (s: Xe2ValueType) => VueValueType, toXe2Value?: (s: VueValueType) => Xe2ValueType) {
    return disposer.disposeVueRef(_toVueRef<Xe2ValueType, VueValueType>(reactVar, false, toVueValue, toXe2Value, false)) as Ref<VueValueType>;
}

/**
 * toVR = toVueRef
 */
export const toVR = toVueRef;

/**
 * 用来将xe2的响应式变量转变成vue3的响应式变量
 * @example
 * const d = createVueDisposer(onBeforeUnmount);
 * const propUiTreeRef = toReadonlyVueRef<PropUiTree | undefined>(d, [propUiTreeManager, 'propUiTree']);
 * const showSceneTreeViewRef = toVR<boolean>(d, [projectManager, "showSceneTreeView"])
 * const showPlayerViewRef = toVR<boolean>(d, [projectManager, "showPlayerView"])
 */
export function toShallowVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(disposer: VueRefDisposer, reactVar: ReactParamsType<Xe2ValueType>, toVueValue?: (s: Xe2ValueType) => VueValueType, toXe2Value?: (s: VueValueType) => Xe2ValueType) {
    return disposer.disposeVueRef(_toVueRef<Xe2ValueType, VueValueType>(reactVar, false, toVueValue, toXe2Value, true)) as ShallowRef<VueValueType>;
}

/**
 * toSVR = toShallowVueRef
 */
export const toSVR = toShallowVueRef;

/**
 * 用来将xe2的响应式变量转变成vue3的响应式变量
 * @example
 * const d = createVueDisposer(onBeforeUnmount);
 * const propUiTreeRef = toReadonlyVueRef<PropUiTree | undefined>(d, [propUiTreeManager, 'propUiTree']);
 * const showSceneTreeViewRef = toVR<boolean>(d, [projectManager, "showSceneTreeView"])
 * const showPlayerViewRef = toVR<boolean>(d, [projectManager, "showPlayerView"])
 */
export function toReadonlyVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(disposer: VueRefDisposer, reactVar: ReactParamsType<Xe2ValueType>, toVueValue?: (s: Xe2ValueType) => VueValueType, toXe2Value?: (s: VueValueType) => Xe2ValueType) {
    return disposer.disposeVueRef(_toVueRef<Xe2ValueType, VueValueType>(reactVar, true, toVueValue, toXe2Value, false)) as Ref<VueValueType>
};

/**
 * toRVR = toReadonlyVueRef
 */
export const toRVR = toReadonlyVueRef;

/**
 * 用来将xe2的响应式变量转变成vue3的响应式变量
 * @example
 * const d = createVueDisposer(onBeforeUnmount);
 * const propUiTreeRef = toReadonlyVueRef<PropUiTree | undefined>(d, [propUiTreeManager, 'propUiTree']);
 * const showSceneTreeViewRef = toVR<boolean>(d, [projectManager, "showSceneTreeView"])
 * const showPlayerViewRef = toVR<boolean>(d, [projectManager, "showPlayerView"])
 */
export function toReadonlyShallowVueRef<Xe2ValueType, VueValueType = Xe2ValueType>(disposer: VueRefDisposer, reactVar: ReactParamsType<Xe2ValueType>, toVueValue?: (s: Xe2ValueType) => VueValueType, toXe2Value?: (s: VueValueType) => Xe2ValueType) {
    return disposer.disposeVueRef(_toVueRef<Xe2ValueType, VueValueType>(reactVar, true, toVueValue, toXe2Value, true)) as ShallowRef<VueValueType>
};

/**
 * toRSVR = toReadonlyShallowVueRef
 */
export const toRSVR = toReadonlyShallowVueRef;

/**
 * 用来将xe2的响应式变量转变成vue3的响应式变量，并且去掉undefined
 * @example
 * const d = createVueDisposer(onBeforeUnmount);
 * const propUiTreeRef = toReadonlyVueRef<PropUiTree | undefined>(d, [propUiTreeManager, 'propUiTree']);
 * const showSceneTreeViewRef = toVR<boolean>(d, [projectManager, "showSceneTreeView"])
 * const showPlayerViewRef = toVR<boolean>(d, [projectManager, "showPlayerView"])
 */
export function toVueRefWithoutUndefined<T>(disposer: VueRefDisposer, reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc?: ((v: T) => T) | undefined) {
    return disposer.disposeVueRef(_toVueRefWithoutUndefined(reactVar, defaultValue, cloneVueValueFunc, false, false));
}

export function toShallowVueRefWithoutUndefined<T>(disposer: VueRefDisposer, reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc?: ((v: T) => T) | undefined) {
    return disposer.disposeVueRef(_toVueRefWithoutUndefined(reactVar, defaultValue, cloneVueValueFunc, false, true));
}

export function toReadonlyVueRefWithoutUndefined<T>(disposer: VueRefDisposer, reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc?: ((v: T) => T) | undefined) {
    return disposer.disposeVueRef(_toVueRefWithoutUndefined(reactVar, defaultValue, cloneVueValueFunc, true, false));
}

export function toReadonlyShallowVueRefWithoutUndefined<T>(disposer: VueRefDisposer, reactVar: ReactParamsType<T | undefined>, defaultValue: T, cloneVueValueFunc?: ((v: T) => T) | undefined) {
    return disposer.disposeVueRef(_toVueRefWithoutUndefined(reactVar, defaultValue, cloneVueValueFunc, true, true));
}

/**
 * toVRWU = toVueRefWithoutUndefined
 */
export const toVRWU = toVueRefWithoutUndefined;

/**
 * toSVRWU = toShallowVueRefWithoutUndefined
 */
export const toSVRWU = toShallowVueRefWithoutUndefined;

/**
 * toRVRWU = toReadonlyVueRefWithoutUndefined
 */
export const toRVRWU = toReadonlyVueRefWithoutUndefined;

/**
 * toRSVRWU = toReadonlyShallowVueRefWithoutUndefined
 */
export const toRSVRWU = toReadonlyShallowVueRefWithoutUndefined;
