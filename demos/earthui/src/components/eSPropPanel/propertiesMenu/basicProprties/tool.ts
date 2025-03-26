import { geoDistance } from "earthsdk3";

//时间戳转换为时间
export const timestampToTime = (timestamp: number, noms?: boolean) => {
    const date = new Date(timestamp); // 根据时间戳创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份，需要加1
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒数
    const millisecond = date.getMilliseconds(); // 获取毫秒数
    let formattedDate
    if (noms) {
        formattedDate = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day} ${hour.toString().length === 1 ? `0${hour}` : hour}:${minute.toString().length === 1 ? `0${minute}` : minute}:${second.toString().length === 1 ? `0${second}` : second}`; // 拼接成格式化后的日期字符串
    } else {
        formattedDate = `${year}-${month.toString().length === 1 ? `0${month}` : month}-${day.toString().length === 1 ? `0${day}` : day} ${hour.toString().length === 1 ? `0${hour}` : hour}:${minute.toString().length === 1 ? `0${minute}` : minute}:${second.toString().length === 1 ? `0${second}` : second}.${millisecond}`; // 拼接成格式化后的日期字符串
    }
    return formattedDate
}
//时间转换为时间戳
export const toTimetampTimes = (dateTime: string) => {
    const date = new Date(dateTime)
    const time = date.getTime()
    return time
}
//计算距离
export const perimeterFromPoints = (points: [number, number, number][]) => {
    let perimeter = 0
    for (let i = 0; i < points.length - 1; i++) {
        const distance = geoDistance(points[i], points[i + 1])
        perimeter += distance
    }
    return perimeter
}