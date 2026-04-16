// 判断字符串是否可以转为JSON对象
export function isJsonObjectString(str: string): boolean {
    try {
        const parsed = JSON.parse(str);
        return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed);
    } catch (e) {
        return false;
    }
}
