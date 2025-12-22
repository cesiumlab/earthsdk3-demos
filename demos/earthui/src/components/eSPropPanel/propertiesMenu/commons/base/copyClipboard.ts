// import {Message} from "earthsdk-ui"
import { ElMessage } from "element-plus"
export async function copyClipboard(text: string|undefined) {//复制
    if(!text) return;
    navigator.clipboard.writeText(text)
        .then(function () {
            ElMessage.success('复制成功');
        }, function (e) {
            ElMessage.error(`复制失败 error:${e}`);
        });
}
