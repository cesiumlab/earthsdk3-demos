/**
 * 获取当前事件监听者的坐标位置
 * 因为HTML没有获取事件监听者坐标的方法，offsetX是事件发起者的坐标，clientX是浏览器窗口的坐标
 * 注意1：只能在addEventListener的回调函数中使用，异步使用时currentTarget会变成null
 * 注意2：eventPath中的div是不能有transform的，否则会导致left，top计算得不准。但是可以将他们的pointer-event设置为none
 * 注意3：canvas的width和height不影响offsetX和offsetY
 * 但是考虑到cesium和openlayers都会用到canvas的事件，所以canvas的pointerEvents还不能设置为none，
 * 好在他们的canvas并没有复杂的transform，无非是多了一个scale而已，TODO: 这个scale倒是可以计算一下！
 *
 * @param mosueEvent
 * @returns
 */
export declare function getDomEventCurrentTargetPos(mosueEvent: MouseEvent): [number, number];
