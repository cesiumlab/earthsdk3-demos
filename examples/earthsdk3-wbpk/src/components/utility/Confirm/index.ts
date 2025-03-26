import { h, render } from 'vue'
import ConfirmCom from './dlcConfirm.vue'

interface DialogParam {
    title?: string //标题
    content?: string //输入的内容
    left?: number  // 弹窗距离左侧的距离 不传则默认居中
    top?: number   // 弹窗距离顶侧的距离 不传则默认居中
    width?: number // 弹窗宽度 不传则默认 300px
    height?: number // 弹窗高度 不传则默认 200px
    cancelText?: string // 传入空字符串则不会显示取消按钮
    sureText?: string   // 传入空字符串则不会显示确认按钮
    editable?: boolean  // 是否显示输入框
    canceledOnTouchOutside?: boolean // 点击空白处关闭弹窗
    result?: Function   // 回调用户操作结果
}

export interface ResultParam {
    content: string  // editable 为 true 时，用户输入的文本
    confirm: boolean // 为 true 时，表示用户点击了确定按钮
}

export default class Confirm {

    private static mountNode: HTMLElement | null = null

    public static open(param: DialogParam) {
        if (this.mountNode)return
        const div = document.createElement("div");
        const vNode = h(ConfirmCom, { ...param })
        render(vNode, div);
        document.body.appendChild(div)
        this.mountNode = div
    }
    public static confirm(param: DialogParam): Promise<ResultParam> {
        return new Promise((resolve, reject) => {
            param.result = (res: ResultParam) => resolve(res)
            this.open(param)
        })
    }

    public static close() {
        if (!this.mountNode) return
        document.body.removeChild(this.mountNode)
        this.mountNode = null
    }
}


   //vue 页面内的两种使用方式
   
  // Confirm.open({
  //   title: '提示',
  //   content: '是否保存当前项目？',
  //   result: async (res: any) => {
  //     const { content, confirm } = res
  //     if (confirm) {
  //       console.log('确定', content)
  //     } else {
  //       console.log('取消', content)
  //     }
  //   }
  // })

  // const res = await Confirm.confirm({
  //   title: '提示',
  //   editable: true,
  //   content: '确定要作废该条订单吗?',
  // })
  // if (res.confirm) {
  //   console.log('确认', res.content)
  // } else {
  //   console.log('取消', res.content)
  // }
