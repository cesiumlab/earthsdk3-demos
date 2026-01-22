import { createVNode } from 'vue'
import { render } from 'vue'
import LiftHeight from './index.vue'
//获取抬升高度
export function getLiftHeightValue(objNumber: number): Promise<number | undefined> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const vnode = createVNode(LiftHeight, {
      show: true,
      objNumber,
      resolve: (option: number | undefined) => {
        render(null, container)
        container.remove()
        resolve(option)
      }
    })
    render(vnode, container)
  })
}
