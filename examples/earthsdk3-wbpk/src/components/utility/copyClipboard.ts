import Message from "./Message";
export async function copyClipboard(text: string) {//复制
    navigator.clipboard.writeText(text)
        .then(function () {
            Message.success('复制成功');
        }, function (e) {
            Message.error('复制失败');
        });
}
