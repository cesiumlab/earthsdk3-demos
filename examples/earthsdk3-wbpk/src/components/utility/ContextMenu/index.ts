import { h, render } from 'vue'
import ContextMenuCom from './dlcContextMenu.vue'

export type MenuItem = {
    type?: 'normal',
    name: string, // 菜单名称
    icon?: string,// 菜单图标
    tips?: string,// 菜单提示
    disabled?: boolean, // 是否禁用
    callback: () => void // 点击回调
} | { type: "divider" }

export interface MenuParam {
    left: number // 弹窗左边距
    top: number // 弹窗上边距
    itemWidth?: number // 弹窗宽度 不传则默认 300px
    itemHeight?: number // 弹窗高度 不传则默认 200px
    menuList: MenuItem[]
}

const getLeftTop = (left: number, top: number, iwidth: number, iheight: number, length: number) => {
    const dom = document.body
    const maxWidth = dom.clientWidth;
    const maxHeight = dom.clientHeight;
    const width = iwidth + 30;
    const height = (iheight + 10) * length + 10;
    const disx = maxWidth - (left + width);
    const disy = maxHeight - (top + height);

    const style = { left, top }

    if (disx < 0) {
        const wl = left - width
        style.left = wl < 0 ? 0 : wl;
    }
    if (disy < 0) {
        const th = top - height
        style.top = th < 0 ? 0 : th;
    }
    return style
}


export default class ContextMenu {
    private static mountNode: HTMLElement | null = null
    public static open(param: MenuParam) {
        if (this.mountNode) this.close()

        const div = document.createElement("div");
        div.style.position = 'fixed'
        div.style.zIndex = '99999'

        const { itemWidth = 200, itemHeight = 25, menuList = [], left, top } = param
        const style = getLeftTop(left, top, itemWidth, itemHeight, menuList.length)
        div.style.left = style.left + 'px'
        div.style.top = style.top + 'px'

        const vNode = h(ContextMenuCom, { itemWidth, itemHeight, menuList })
        render(vNode, div);
        document.body.appendChild(div)
        this.mountNode = div
    }
    public static close() {
        if (!this.mountNode) return
        document.body.removeChild(this.mountNode)
        this.mountNode = null
    }
}
