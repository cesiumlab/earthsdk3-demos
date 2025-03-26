import MessageCom from "./dlcMessage.vue";
import { h, render } from "vue";
type InfoType = "success" | "error" | "warning" | "info"

let dlcMessageBox: HTMLDivElement | null = null
let boxLength = 0

function addAndRemove(type: InfoType, text: string, directive: number) {
    if (!dlcMessageBox) return;
    const div = document.createElement("div");
    const vNode = h(MessageCom, { type, text, directive });
    render(vNode, div);
    dlcMessageBox.appendChild(div);
    const lastChild = div.lastChild as HTMLElement
    lastChild.style.marginTop = (60 * boxLength) + 'px'
    boxLength += 1
    setTimeout(() => {
        if (!dlcMessageBox) return;
        div.remove()
        boxLength -= 1
        const childNodes = dlcMessageBox.childNodes
        for (var i = 0; i < childNodes.length; i++) {
            const lastChild = childNodes[i].lastChild as HTMLElement
            if (lastChild) {
                const marginTop = lastChild.style.marginTop
                const marginTopNum = marginTop.substring(0, marginTop.indexOf('px'))
                lastChild.style.marginTop = Number(marginTopNum) - 60 + 'px'
            }
        }
        if (childNodes.length === 0) {
            if (!dlcMessageBox) return
            dlcMessageBox && document.body.removeChild(dlcMessageBox)
            dlcMessageBox = null
        }
    }, directive);
}


export default function Message(type: InfoType, text: string, directive: number) {
    if (!dlcMessageBox) {
        dlcMessageBox = document.createElement("div");
        document.body.appendChild(dlcMessageBox);
        addAndRemove(type, text, directive)
    } else {
        addAndRemove(type, text, directive)
    }
}

Message.success = function (text: string, directive = 2500) {
    Message("success", text, directive);
};

Message.error = function (text: string, directive = 2500) {
    Message("error", text, directive);
};

Message.warning = function (text: string, directive = 2500) {
    Message("warning", text, directive);
};

Message.info = function (text: string, directive = 2500) {
    Message("info", text, directive);
};

