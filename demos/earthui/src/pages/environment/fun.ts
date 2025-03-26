//时间戳转换为时间
export function timestampToTime(hours: any, minute: any) {
    const date = new Date()//获取当前时间
    const year = date.getFullYear(); //获取完整的年份(4位,1970-????)
    const month = date.getMonth();  //获取当前月份(0-11,0代表1月)
    const date1 = date.getDate();  //获取当前日(1-31)
    // const minutes = date.getMinutes();  //获取当前分钟数(0-59)
    // const seconds = date.getSeconds();  //获取当前秒数(0-59)
    const time = `${year}-${month + 1}-${date1} ${hours < 24 ? hours : '23'}:${hours < 24 ? minute : '59'}:${hours < 24 ? '00' : '59'}`
    return time
}
//时间转换为时间戳
export function timeToTimestamp(time: any) {
    //@ts-ignore
    const times = Date.parse(new Date(time))
    return times
}
export function formatDate(now: number) {
    const time = new Date(now)
    const hour = time.getHours();     //返回日期中的小时数（0到23）
    const minute = time.getMinutes(); //返回日期中的分钟数（0到59）
    return [hour, minute]
}

