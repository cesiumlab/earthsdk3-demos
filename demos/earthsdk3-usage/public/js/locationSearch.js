// 获取地理位置信息列表
const getSearchList = async (keyword) => {
    const baseUrl = "https://restapi.amap.com/v3/place/text?key=9f0109b9f387771cf2c28b5df88ac69d&keywords="
    const url = baseUrl + keyword
    const response = await fetch(url)
    const responseJson = await response.json();
    return responseJson
}
window.getSearchList = getSearchList