/**
 * 获取脚本路径、目录、名称、扩展名
 * 注意：
 * 1. 脚本路径、目录、名称、扩展名都是以脚本名称为前缀，内置环境变量;
 * 2. earthsdk3-assets.js这个文件名称不允许更改！！！
 * 3. earthsdk3-assets.js这个文件名称不允许更改！！！
 * 4. earthsdk3-assets.js这个文件名称不允许更改！！！
 */

function getDirAndFileNameFromPath(path) {
    const result = /(.*)[\/\\](.*)/.exec(path);
    if (result && result.length >= 3) {
        return [result[1], result[2]];
    } else {
        return undefined;
    }
}
function getNameAndExtFromFileName(fileName) {
    const result = /(.*)\.(.*)/.exec(fileName);
    if (result && result.length >= 3) {
        return [result[1], result[2]];
    } else {
        return undefined;
    }
}

const init = () => {
    window.ESSDK_ENV = window.ESSDK_ENV || {};
    const currentScriptPath = document?.currentScript?.src; // 获取当前脚本路径
    const [scriptDir, scriptFileName] = getDirAndFileNameFromPath(currentScriptPath) ?? ['', '']; // 获取脚本目录和文件名
    const [scriptName, scriptExt] = getNameAndExtFromFileName(scriptFileName) ?? ['', '']; // 获取脚本名称和扩展名
    if (!scriptName) {
        console.warn(`getCurrentScriptPath error: ${scriptName}`);
        return;
    }

    window.ESSDK_ENV[`${scriptName}-script-path`] = currentScriptPath;// 设置脚本路径
    window.ESSDK_ENV[`${scriptName}-script-dir`] = scriptDir;// 设置脚本目录
    window.ESSDK_ENV[`${scriptName}-script-name`] = scriptName;// 设置脚本名称
    window.ESSDK_ENV[`${scriptName}-script-ext`] = scriptExt;// 设置脚本扩展名
}

init();
