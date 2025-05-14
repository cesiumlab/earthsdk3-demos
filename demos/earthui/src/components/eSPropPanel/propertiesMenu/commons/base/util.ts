export const isFunction = (val: any) => typeof val === 'function';
export const isArray = Array.isArray;
export const isString = (val: any) => typeof val === 'string';
export const isSymbol = (val: any) => typeof val === 'symbol';
export const isBoolean = (val: any) => typeof val === 'boolean';
export const isObject = (val: any) => val !== null && typeof val === 'object';

export const getGuid = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`
}


/**
 * 函数节流
 */
export const throttle = (fn: { apply: (arg0: any, arg1: IArguments) => void }, delay?: number) => {
    var lastTime: number;
    var timer: any;
    var delayTime = delay || 200;
    return function () {
        var args = arguments;
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        if (lastTime && nowTime - lastTime < delayTime) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                // 记录上一次函数触发的时间
                lastTime = nowTime;
                // 修正this指向问题
                //@ts-ignore
                fn.apply(this, args);
            }, delay);
        } else {
            lastTime = nowTime;
            //@ts-ignore
            fn.apply(this, args);
        }
    };
};

/**
 * 新增事件监听
 * @param {*} element
 * @param {*} event
 * @param {*} handler
 * @param {*} useCapture
 */
export const on = function (
    element: { addEventListener: (arg0: any, arg1: any, arg2: boolean) => void },
    event: any,
    handler: any,
    useCapture: any = false
) {
    if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
    }
};

/**
 * 移除事件监听
 * @param {*} element
 * @param {*} event
 * @param {*} handler
 * @param {*} useCapture
 */
export const off = function (
    element: { removeEventListener: (arg0: any, arg1: any, arg2: boolean) => void },
    event: any,
    handler: any,
    useCapture: any = false
) {
    if (element && event && handler) {
        element.removeEventListener(event, handler, useCapture);
    }
};
