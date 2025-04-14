/**
 * 动态创建ID
 * @returns 
 */
function guid() {
    var grid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0;
            var v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
    return grid;
}

/**
 * 根据url地址获取参数
 * @returns 
 */
function getUrlParam() {
    let url = window.location.search; /* 获取属性（“?”后面的分段） */
    let urlParamObj = {}
    if (url) {
        let lastUrl = url.slice(1)
        let urlParam = lastUrl.split('&')
        urlParam.forEach(item => {
            const newArr = item.split('=')
            urlParamObj[newArr[0]] = newArr[1]
        })
    }
    return urlParamObj
}


export {
    guid,
    getUrlParam
}